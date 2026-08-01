import type { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app.js";
import { prisma } from "../src/config/prisma.js";

export function buildApp(): Express {
  return createApp();
}

/**
 * Wipes every table this test suite touches, in FK-safe order. Tests run
 * sequentially (see vitest.config.ts `fileParallelism: false`) against a
 * local Postgres instance, so this keeps each test file's data isolated
 * without needing a separate database per run.
 */
export async function resetDatabase() {
  await prisma.refreshToken.deleteMany();
  await prisma.invite.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.openingHour.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
}

export type RegisteredCompany = {
  accessToken: string;
  refreshCookie: string;
  companyId: string;
  companySlug: string;
  userEmail: string;
};

/** Registers a brand-new company + OWNER user through the real HTTP API and returns its credentials. */
export async function registerCompany(
  app: Express,
  overrides: Partial<{ email: string; companyName: string; password: string }> = {},
): Promise<RegisteredCompany> {
  const email = overrides.email ?? `owner-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
  const password = overrides.password ?? "Password123";
  const companyName = overrides.companyName ?? `Test Company ${Math.random().toString(36).slice(2, 8)}`;

  const res = await request(app).post("/api/auth/register").send({
    firstName: "Ada",
    lastName: "Lovelace",
    email,
    password,
    passwordConfirm: password,
    companyName,
  });

  if (res.status !== 200) {
    throw new Error(`registerCompany failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  const refreshCookie = res.headers["set-cookie"]?.[0] ?? "";

  return {
    accessToken: res.body.accessToken as string,
    refreshCookie,
    companyId: res.body.user.companyId as string,
    companySlug: res.body.user.companySlug as string,
    userEmail: email,
  };
}

export function authHeader(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` };
}
