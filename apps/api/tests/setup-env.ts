// Runs before every test file (see vitest.config.ts `setupFiles`) so
// `src/config/env.ts` finds a valid environment on first import. Tests run
// against the same local Postgres used for development (see helpers.ts
// `resetDatabase`), pointed at by DATABASE_URL below unless already set.
process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??= "postgresql://manegio:manegio@localhost:5433/manegio?schema=public";
process.env.CORS_ORIGIN ??= "http://localhost:5173";
process.env.JWT_ACCESS_SECRET ??= "test-access-secret-not-for-production";
process.env.JWT_REFRESH_SECRET ??= "test-refresh-secret-not-for-production";
process.env.JWT_ACCESS_TTL_MINUTES ??= "15";
process.env.JWT_REFRESH_TTL_DAYS ??= "30";
process.env.API_PUBLIC_URL ??= "http://localhost:4000";
process.env.WEB_PUBLIC_URL ??= "http://localhost:5173";
