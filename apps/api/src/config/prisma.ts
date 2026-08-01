import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

// Reuse a single client across hot reloads in dev, and across test files
// that import this module more than once.
declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__prisma ??
  new PrismaClient({
    log: env.isProduction ? ["error", "warn"] : ["warn", "error"],
  });

if (!env.isProduction) {
  globalThis.__prisma = prisma;
}
