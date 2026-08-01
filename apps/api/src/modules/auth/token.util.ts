import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { hashToken as hashTokenUtil } from "../../utils/crypto.js";

export type AccessTokenPayload = { sub: string };
export type RefreshTokenPayload = { sub: string; jti: string };

export const REFRESH_COOKIE_NAME = "manegio_refresh_token";

export function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId } satisfies AccessTokenPayload, env.JWT_ACCESS_SECRET, {
    // Expressed in seconds (a plain number) rather than a unit-suffixed
    // string so it satisfies jsonwebtoken's stricter `expiresIn` typing.
    expiresIn: env.JWT_ACCESS_TTL_MINUTES * 60,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function signRefreshToken(userId: string, jti: string): string {
  return jwt.sign({ sub: userId, jti } satisfies RefreshTokenPayload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_TTL_DAYS * 24 * 60 * 60,
  });
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
}

/** Refresh tokens are stored hashed - never the raw JWT - so a DB leak alone can't be replayed. */
export function hashToken(token: string): string {
  return hashTokenUtil(token);
}

export function refreshTokenExpiryDate(): Date {
  const ms = env.JWT_REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + ms);
}

export const refreshCookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "lax" as const,
  path: "/api/auth",
  maxAge: env.JWT_REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000,
};
