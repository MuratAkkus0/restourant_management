# Built from the monorepo root: `docker build -f apps/api/Dockerfile .`
FROM node:20-slim AS base
# Prisma's engines need libssl at runtime, which node:20-slim doesn't ship.
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
# Pin the exact pnpm version so corepack never auto-downloads a newer
# release that requires a newer Node than this base image ships.
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-workspace.yaml ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --frozen-lockfile=false --filter=@manegio/api... --filter=@manegio/shared

FROM deps AS build
COPY packages/shared packages/shared
COPY apps/api apps/api
RUN pnpm --filter=@manegio/shared build
RUN pnpm --filter=@manegio/api exec prisma generate --schema=prisma/schema.prisma
RUN pnpm --filter=@manegio/api build

FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=build /repo/package.json /repo/pnpm-workspace.yaml ./
COPY --from=build /repo/node_modules /repo/node_modules
COPY --from=build /repo/packages/shared /repo/packages/shared
COPY --from=build /repo/apps/api /repo/apps/api
WORKDIR /repo/apps/api
EXPOSE 4000
CMD ["sh", "-c", "pnpm exec prisma migrate deploy --schema=prisma/schema.prisma && node dist/server.js"]
