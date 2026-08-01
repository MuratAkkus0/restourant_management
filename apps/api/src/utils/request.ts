import type { Request } from "express";
import { AppError } from "../middleware/app-error.js";

/**
 * Express 5 types route params as `string | string[]` (arrays only occur
 * for wildcard/repeated segments, which none of our routes use). This reads
 * a single named param and fails loudly instead of silently accepting an
 * array where a string id is expected.
 */
export function getParam(req: Request, name: string): string {
  const value = req.params[name];
  if (typeof value !== "string") {
    throw AppError.badRequest(`Invalid route parameter: ${name}`);
  }
  return value;
}
