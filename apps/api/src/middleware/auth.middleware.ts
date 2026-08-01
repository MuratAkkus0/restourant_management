import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../modules/auth/token.util.js";
import { AppError } from "./app-error.js";

/** Requires a valid `Authorization: Bearer <accessToken>` header and attaches `req.user`. */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw AppError.unauthorized("No access token provided.");
  }

  const token = header.slice("Bearer ".length).trim();

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub };
    next();
  } catch {
    throw AppError.unauthorized("Invalid or expired access token.");
  }
}
