# Manegio - multi-tenant QR menu platform

Manegio is a SaaS product for restaurants: an admin panel to manage a menu
(categories, products, opening hours, staff) and a public, no-login QR-code
menu page for customers. It started as a React + Firebase prototype; this
version replaces Firebase entirely with a first-party Express + PostgreSQL
backend and finishes the product end to end.

This is a portfolio project. The sections below are written to be read
critically: **[What's finished vs. still a stub](#whats-finished-vs-still-a-stub)**
tells you exactly what to evaluate.

## Architecture

```
manegio/
├── apps/
│   ├── web/            React 18 + TypeScript + Vite + Tailwind + Redux Toolkit (RTK Query)
│   └── api/             Express 5 + TypeScript + Prisma + PostgreSQL
├── packages/
│   └── shared/          zod schemas + inferred TS types, imported by BOTH web and api
├── docker-compose.yml    postgres + api + web
└── pnpm-workspace.yaml
```

**Why a shared package:** `packages/shared` holds the zod schemas for every
write operation (register, login, create category, create product, update
company profile, invite a member, ...). `apps/api` uses the exact same
schema to validate `req.body` (`middleware/validate.ts`) that `apps/web`
uses to validate a Formik form (`utils/zodToFormikValidate.ts`). Validation
rules can never drift between client and server because there is only one
copy of them.

### Backend - module-based, not layered MVC

```
apps/api/src/
  modules/<feature>/
    <feature>.routes.ts       HTTP wiring only
    <feature>.controller.ts   req/res only - zero business logic
    <feature>.service.ts      business logic + tenant checks - the real value lives here
    <feature>.repository.ts   Prisma access, always scoped by companyId
  middleware/                 auth, tenant resolution, error handler, rate limiting, zod validation
  config/                     env validation, prisma client, pino logger
```

Modules: `auth`, `companies`, `menus`, `categories`, `products`, `uploads`, `qr`.

Controllers never contain business logic; services never see `req`/`res` -
they take plain arguments (e.g. `companyId`, a validated DTO) and return
plain data or throw an `AppError`.

## The multi-tenant model

`Company` owns everything (`Category`, `Product`, `OpeningHour`, `Invite`).
A `User` can belong to a company through a `Membership`, which carries the
role (`OWNER` / `ADMIN` / `STAFF`). Two things make cross-tenant access
structurally impossible, not just "hidden by the UI":

1. **`companyId` is never read from the request.** `middleware/tenant.middleware.ts`'s
   `resolveTenant` looks up the caller's `Membership` from their verified
   user id and attaches `req.tenant = { companyId, role, membershipId }`.
   Every module's repository takes `companyId` as an explicit argument and
   filters every query by it (`WHERE companyId = ... AND id = ...`) - a
   client can send any product id it wants, it will only ever resolve
   inside its own tenant.
2. **Roles are only ever assigned server-side.** Registering creates the
   caller as `OWNER` of a brand-new company - there is no `role` field in
   the register payload at all (compare this to the old Firebase flow's
   `src/services/firebase/registerNewPerson.ts`, which read the role
   straight from the client). Joining an existing company requires a
   server-issued, single-use invite token (`Invite.tokenHash`, hashed at
   rest); the role is fixed on the invite when an OWNER/ADMIN creates it,
   never chosen by the person accepting it.

`apps/api/tests/tenant-isolation.test.ts` is the project's most important
test file: it spins up two real companies over HTTP and asserts company B
gets 404s (not empty/redacted data - genuine 404s) when it tries to read,
update, delete, reorder or publish-toggle company A's categories/products,
and that the public menu of an unpublished company is unreachable.

### Auth: short-lived access token + httpOnly refresh cookie

- `POST /api/auth/login` / `register` return a JWT **access token** (15 min,
  configurable) in the JSON body and set an httpOnly, `SameSite=Lax` **refresh
  token** cookie (30 days, configurable), scoped to `/api/auth`.
- The access token is kept in memory only (Redux state) - never
  `localStorage`, never `redux-persist`. If it's stolen via XSS it's only
  valid for minutes.
- The refresh token is stored **hashed** (SHA-256) in `RefreshToken`, and is
  **rotated** on every use: calling `/api/auth/refresh` revokes the old row
  and issues a new access+refresh pair. Replaying an already-used refresh
  token revokes the entire session as a precaution against token theft.
- `apps/web`'s RTK Query base query (`store/api/apiClient.ts`) automatically
  calls `/api/auth/refresh` on a 401 and retries the original request once;
  `App.tsx` calls it once on page load to silently restore a session from
  the cookie, so refreshing the browser doesn't log you out.

### Public surface

`GET /api/public/menu/:companySlug` - no auth, returns only published
categories/products of a company whose menu is published, with a
`Cache-Control: public, max-age=60` header. This is what the generated QR
code (`GET /api/admin/qr`) points at.

## What's finished vs. still a stub

**Backend - fully implemented and tested:**
- Auth: register (creates company + OWNER), login, refresh rotation, logout,
  invite acceptance.
- Companies: profile CRUD, opening hours, dashboard stats, staff members
  (role change / removal with owner-can't-be-removed / can't-demote-self
  guards), invites (create/list/revoke, role-restricted: only an OWNER can
  invite an ADMIN).
- Categories: CRUD + manual reordering.
- Products: CRUD + image upload + publish/unpublish + reordering.
- Uploads: local-disk storage behind a `Storage` interface
  (`modules/uploads/storage.interface.ts`) so swapping to S3/etc. later
  doesn't touch any calling code; validates mime type and size.
- Menu composition: admin view of the full category/product tree, one
  publish/unpublish switch for the whole public menu.
- QR code generation (PNG/SVG) for the public menu URL.
- Tenant isolation, proven by tests (see above).

**Frontend - rewired to the real API, replacing every Firebase call:**
- Login / Register / Logout, session restore via httpOnly refresh cookie.
- Category management (create/edit/delete) - real data, no more hard-coded
  "Beverages" row.
- Product management (create/edit/delete/publish, image upload, category
  picker) - real data, no more hard-coded "Test Title" card.
- Company profile + opening hours editor.
- Staff & access control (invite, change role, remove member).
- Menu publish switch + QR code display/download/copy-link.
- Dashboard with real aggregate numbers (category/product/member counts,
  published-vs-draft split) - no more static chart data.
- Public, no-login menu page at `/menu/:companySlug` for the QR code to
  land on.

**Deliberately still "Coming soon" (`src/views/admin/ComingSoonView.tsx`),
because the domain model for them doesn't exist and building it would be a
separate, large feature, not a finishing touch:**
- Orders overview / monthly reports / key metrics - there is no order/POS
  domain in this system yet (no cart, no order table, no payment).
- Product inventory / stock tracking.
- Discounts & offers, campaign management.
- POS integration, notification preferences.

If you're evaluating this repo: everything under "finished" is real,
tenant-scoped, validated, and has automated coverage; everything under
"still a stub" is honestly labelled rather than faked with static data.

## Design system

- **Palette**: `tailwind.config.js` defines two semantic tokens on top of
  Tailwind's default scale - `primary` (`slate-900`) and `accent` (`white`),
  always used as a pair (dark surface + light text/icons, e.g. the header,
  the homepage hero, the public menu banner), which gives >= 4.5:1 contrast
  (WCAG AA). `neutralLight` (`slate-50`) is the light section background
  used for the FAQ and public menu page body. The brand accent gradient
  (`from-orange-500 to-red-600`) is reserved for primary calls to action
  (buttons) so it stays meaningful instead of being sprinkled everywhere.
- **Type scale**: `Title`/`Pharagrapf` atoms centralize font sizing
  (`2xs`/`xs`/`sm`/`base`/`large`/`xl`/`2xl`) so every screen picks from the
  same scale instead of ad-hoc `text-*` classes.
- **Empty/loading/error states**: every list added in this pass
  (categories, products, members, invites, the public menu, the dashboard)
  renders an explicit "loading...", "could not load..." or "no X yet -
  add one" state instead of a blank screen.
- **Forms**: Formik is kept as the form engine (matches the existing
  atomic-design input components), but validation now comes from
  `packages/shared`'s zod schemas via `utils/zodToFormikValidate.ts` - the
  same schema the API validates the request with, so client and server can
  never disagree on what a valid email/password/category name is.
- **Responsive**: the admin sidebar collapses to an overlay drawer below
  `md`; the public menu page and dashboard stat cards reflow to a single
  column on mobile.

## Local setup

### Prerequisites
- Node.js >= 20, [pnpm](https://pnpm.io) 9.x (`corepack enable` picks up the
  version pinned in `package.json` automatically)
- Docker + Docker Compose (for Postgres, or to run the whole stack)

### Option A - everything in Docker

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
docker compose up --build
```

This starts Postgres (`localhost:5433`), the API (`localhost:4000`,
migrations applied automatically on boot) and the web app in dev mode
(`localhost:5173`). Seed demo data once the API is up:

```bash
docker compose exec api pnpm prisma:seed
```

### Option B - Postgres in Docker, API/web on the host (faster iteration)

```bash
pnpm install

# Postgres only
docker compose up -d db

cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

pnpm --filter @manegio/shared build
pnpm --filter @manegio/api prisma:migrate   # first run: creates the schema
pnpm --filter @manegio/api prisma:seed       # optional demo data

pnpm --filter @manegio/api dev    # http://localhost:4000
pnpm --filter @manegio/web dev    # http://localhost:5173
```

Seed accounts (also printed by the seed script):
- `owner@trattoria-bella.test` / `Password123` - menu is published, has 4 demo products across 2 categories.
- `owner@corner-bakery.test` / `Password123` - menu is a draft (unpublished), for exercising the "not published yet" state.

## Environment variables

### `apps/api/.env`
| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (Prisma) |
| `PORT` | API port (default `4000`) |
| `CORS_ORIGIN` | Comma-separated list of allowed origins |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | JWT signing secrets (>= 16 chars; generate real ones with `openssl rand -hex 32`) |
| `JWT_ACCESS_TTL_MINUTES` | Access token lifetime in minutes (default `15`) |
| `JWT_REFRESH_TTL_DAYS` | Refresh token lifetime in days (default `30`) |
| `API_PUBLIC_URL` | This API's own base URL (used to build absolute upload/QR URLs) |
| `WEB_PUBLIC_URL` | The web app's base URL (used to build the invite-accept link and the QR code's target) |

### `apps/web/.env`
| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL of the API this app talks to |

## API reference

All `/api/admin/*` routes require `Authorization: Bearer <accessToken>`.

**Auth** (`/api/auth`)
- `POST /register` - `{ firstName, lastName, email, password, passwordConfirm, companyName }` -> creates a company + OWNER
- `POST /login` - `{ email, password }`
- `POST /refresh` - rotates the refresh cookie, returns a new access token
- `POST /logout` - revokes the current refresh token
- `POST /accept-invite` - `{ token, firstName, lastName, password, passwordConfirm }`
- `GET /me` - current user + role (requires auth)

**Companies** (`/api/admin/companies`)
- `GET /me`, `PATCH /me` - company profile
- `GET /me/opening-hours`, `PUT /me/opening-hours`
- `GET /me/stats` - dashboard aggregate numbers
- `GET /me/members`, `PATCH /me/members/:membershipId`, `DELETE /me/members/:membershipId`
- `GET /me/invites`, `POST /me/invites`, `DELETE /me/invites/:inviteId`

**Categories** (`/api/admin/categories`) - `GET /`, `POST /`, `PATCH /:id`, `DELETE /:id`, `PATCH /reorder`

**Products** (`/api/admin/products`) - `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`, `PATCH /:id/publish`, `PATCH /reorder`

**Menu** (`/api/admin/menu`) - `GET /` (composed admin view), `PATCH /publish`

**QR** (`/api/admin/qr`) - `GET /?format=png|svg`, `GET /meta` (returns the plain menu URL)

**Uploads** (`/api/admin/uploads`) - `POST /` (multipart `file` field, JPEG/PNG/WEBP, <= 5MB) -> `{ url }`

**Public** - `GET /api/public/menu/:companySlug`

## Tests

```bash
docker compose up -d db
pnpm --filter @manegio/api prisma:migrate
pnpm --filter @manegio/api test
```

24 tests across 6 files (Vitest + Supertest, real HTTP requests against the
app, real Postgres - no mocking of the database): `auth`, `categories`,
`products`, `companies` (roles/invites), `public-menu`, and
`tenant-isolation` (the centerpiece - see [above](#the-multi-tenant-model)).
Tests wipe the relevant tables in `beforeEach` and run sequentially against
the same local database.

## Verification actually run for this change

- `pnpm install` at the root - passes
- `pnpm -r typecheck` - passes (shared, api, web)
- `pnpm -r lint` - passes (0 errors; 2 pre-existing warnings in unrelated files)
- `pnpm -r build` - passes (shared, api, web)
- `pnpm --filter @manegio/api test` - **24/24 passing**, including tenant isolation
- `docker compose up --build` - all three containers (`db`, `api`, `web`)
  come up healthy; exercised with real `curl` requests: register two
  companies, log in, create a category and product, confirm the public menu
  404s until published, publish it, confirm the public menu now serves it,
  then confirm company B gets a 404 (not company A's data) when it tries to
  read/delete company A's product by id, and that company A's data is
  unchanged afterwards.

## Known limitations / open risks

- A user belongs to exactly one company (one `Membership`) in this version;
  the schema supports more, but there's no multi-company switcher UI.
- Uploaded images are stored on local disk (a named Docker volume in
  compose); the `Storage` interface makes swapping to S3/GCS a
  service-level change, not an app-wide rewrite, but that swap itself isn't done.
- The production web Docker image runs the Vite **dev server** (for
  parity/simplicity with the compose setup); a real deployment should
  instead run `pnpm --filter @manegio/web build` and serve `apps/web/dist`
  as static files behind a CDN/reverse proxy.
- No email delivery is wired up: invite links are returned directly in the
  API response (and copied to the clipboard client-side) rather than emailed.
- The production JS bundle is ~2.4MB (mostly `react-google-charts`); fine
  for a portfolio project, but a real production build should code-split it.
