# Built from the monorepo root: `docker build -f apps/web/Dockerfile .`
# Development-oriented image (Vite dev server with HMR). For a production
# deployment, build with `pnpm --filter @manegio/web build` and serve
# apps/web/dist from any static host / CDN instead of this image.
FROM node:20-slim AS base
RUN corepack enable
WORKDIR /repo

COPY package.json pnpm-workspace.yaml ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile=false --filter=@manegio/web... --filter=@manegio/shared

COPY packages/shared packages/shared
COPY apps/web apps/web
RUN pnpm --filter=@manegio/shared build

WORKDIR /repo/apps/web
EXPOSE 5173
CMD ["pnpm", "dev", "--", "--host"]
