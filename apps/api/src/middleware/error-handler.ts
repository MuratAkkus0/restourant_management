import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger.js";
import { AppError } from "./app-error.js";

/**
 * Centralized error handler. Known, expected errors (AppError, zod
 * ValidationError) are reported to the client with their real status and
 * message. Anything else is an internal failure: logged with full detail
 * server-side, but the client only ever sees a generic 500.
 */
// The `_req` and `next` parameters are required by Express to recognize this
// as an error-handling middleware (arity 4), even though they're unused here.
export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message, details: err.details });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed.",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  logger.error({ err }, "Unhandled error");
  return res.status(500).json({ message: "Internal server error." });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}
