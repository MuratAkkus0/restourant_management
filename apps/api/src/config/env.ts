import { z } from "zod";

// Fail fast and loudly on boot if the environment is misconfigured, instead
// of surfacing confusing errors the first time a route touches a missing var.
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required."),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required."),
  JWT_ACCESS_SECRET: z.string().min(16, "JWT_ACCESS_SECRET must be at least 16 characters."),
  JWT_REFRESH_SECRET: z.string().min(16, "JWT_REFRESH_SECRET must be at least 16 characters."),
  JWT_ACCESS_TTL_MINUTES: z.coerce.number().int().positive().default(15),
  JWT_REFRESH_TTL_DAYS: z.coerce.number().int().positive().default(30),
  API_PUBLIC_URL: z.string().url(),
  WEB_PUBLIC_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean),
  isProduction: parsed.data.NODE_ENV === "production",
  isTest: parsed.data.NODE_ENV === "test",
};
