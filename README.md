# Manegio (QR-menu restaurant management)

Manegio is a React + Firebase SaaS for restaurants: a public marketing site
plus an admin panel for managing a QR-code menu. This is a portfolio project
and is described here honestly - see [What works / What is a stub](#what-works--what-is-a-stub)
before assuming anything beyond auth, routing and the shell UI is finished.

## Tech stack

- **React 18** + **TypeScript** (strict) + **Vite 6**
- **Tailwind CSS** for styling
- **Redux Toolkit** + `redux-persist` for client state
- **Firebase** (Auth + Firestore) for backend/auth
- **Formik** + **Yup** for forms and validation
- **react-router-dom v7** for routing
- **ESLint** + **Prettier**

## What works / What is a stub

**Works:**
- Email/password authentication (Firebase Auth), including the admin
  registration flow that creates a company and an owning admin user.
- Role-based route protection (`ProtectedRoutes`) reading a per-user role
  from Firestore.
- The marketing home page, login/register forms with client-side validation.
- The admin panel shell: sidebar navigation, layout, and a couple of
  functional screens (add/list products, add category).

**Is a stub / not implemented:**
- Most of the admin panel. Routes such as Monthly Reports, Key Metrics,
  Product Inventory, Category List, Discounts & Offers, Campaign Management,
  Company Information, POS Integration, Access Control, and Notification
  Preferences all render a shared "Coming soon" placeholder
  (`src/views/admin/ComingSoonView.tsx`) rather than real functionality.
- The Overview chart on the admin dashboard uses static sample data, not
  real orders.
- There is no customer-facing ordering flow, no payments, and no POS
  integration.
- There is no invite/access-key verification for joining an existing
  company as a non-admin user (see the "Known limitation" note in
  `firestore.rules`).
- The `/user` (personal dashboard) navigation link and route are not wired
  up yet.

If you're evaluating this repo: the parts that work are meant to show
real, working patterns (auth, routing, forms, state, Firestore rules); the
stubs are there to show planned scope without pretending they're built.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your own Firebase project (Firestore + Authentication with the
   Email/Password provider enabled).
3. Copy `.env.example` to `.env` and fill in your Firebase web app config
   (Firebase console > Project settings > General > Your apps):
   ```bash
   cp .env.example .env
   ```
4. Deploy the Firestore security rules in `firestore.rules` to your project
   - this is required, not optional. Without it, Firestore falls back to
     whatever default rules your project was created with, and the app has
     no other authorization layer:
   ```bash
   npm install -g firebase-tools   # if you don't have the CLI
   firebase login
   firebase use --add               # pick your Firebase project
   firebase deploy --only firestore:rules
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check (`tsc -b`) then build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally
- `npm run format` - format `src/` with Prettier

## Branches

This repository has three branches: `v1.0`, `main` and `v2.0`. `main` and
`v2.0` are currently identical; `v1.0` is the actively developed branch and
is ahead of the other two. If you're browsing this repo, check which branch
you're on before assuming it reflects the latest state.

## Security notes

- Firebase web config values (API key, project id, etc.) are public client
  identifiers by design, not secrets - but they're read from environment
  variables (`.env`, gitignored) instead of being hardcoded, both for
  hygiene and so different environments can use different Firebase
  projects.
- Authorization is enforced by `firestore.rules`, not just by client-side
  route guards. Deploy the rules file to every environment - see
  [Local setup](#local-setup).
