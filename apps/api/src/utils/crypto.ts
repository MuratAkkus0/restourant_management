import crypto from "node:crypto";

/** Deterministic hash used to store lookup-able secrets (refresh tokens, invite tokens) without keeping the raw value. */
export function hashToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

/** High-entropy, URL-safe opaque token for one-off links (e.g. invite acceptance). */
export function generateOpaqueToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}
