import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

type Source = "body" | "query" | "params";

/**
 * Validates `req[source]` against a shared zod schema (the same schema the
 * frontend uses for its own form validation) and replaces it with the
 * parsed, coerced data. Fails with a 400 and field-level messages on error.
 */
export function validate(schema: ZodSchema, source: Source = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req[source] = result.data;
    next();
  };
}
