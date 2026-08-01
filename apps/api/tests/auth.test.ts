import type { Express } from "express";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../src/config/prisma.js";
import { buildApp, resetDatabase } from "./helpers.js";

describe("auth", () => {
  let app: Express;

  beforeEach(async () => {
    await resetDatabase();
    app = buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const validRegisterBody = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    password: "Password123",
    passwordConfirm: "Password123",
    companyName: "Ada's Diner",
  };

  it("registers a new company and always assigns the caller the OWNER role", async () => {
    const res = await request(app).post("/api/auth/register").send(validRegisterBody);

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
    expect(res.body.user.role).toBe("OWNER");
    expect(res.body.user.companySlug).toBe("adas-diner");
    expect(res.headers["set-cookie"]?.[0]).toMatch(/manegio_refresh_token=/);
  });

  it("ignores a client-supplied role and never lets it escalate privilege", async () => {
    // Even if a caller stuffs an unexpected `role` field into the register
    // payload, the shared zod schema doesn't recognise it and it never
    // reaches auth.service - the caller is always OWNER of their own company.
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validRegisterBody, role: "OWNER_OF_EVERYTHING", isAdmin: true });

    expect(res.status).toBe(200);
    expect(res.body.user.role).toBe("OWNER");
  });

  it("rejects registration with a weak password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validRegisterBody, password: "short", passwordConfirm: "short" });
    expect(res.status).toBe(400);
  });

  it("rejects a duplicate email with 409", async () => {
    await request(app).post("/api/auth/register").send(validRegisterBody);
    const res = await request(app).post("/api/auth/register").send(validRegisterBody);
    expect(res.status).toBe(409);
  });

  it("logs in with correct credentials and rejects wrong ones with the same generic message", async () => {
    await request(app).post("/api/auth/register").send(validRegisterBody);

    const wrongPassword = await request(app)
      .post("/api/auth/login")
      .send({ email: validRegisterBody.email, password: "WrongPass123" });
    expect(wrongPassword.status).toBe(401);

    const unknownEmail = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@example.com", password: "Password123" });
    expect(unknownEmail.status).toBe(401);
    expect(unknownEmail.body.message).toBe(wrongPassword.body.message);

    const ok = await request(app)
      .post("/api/auth/login")
      .send({ email: validRegisterBody.email, password: validRegisterBody.password });
    expect(ok.status).toBe(200);
    expect(ok.body.user.email).toBe(validRegisterBody.email);
  });

  it("rejects requests to /api/admin/* without an access token", async () => {
    const res = await request(app).get("/api/admin/categories");
    expect(res.status).toBe(401);
  });

  it("rotates the refresh token on /api/auth/refresh and rejects reuse of the old one", async () => {
    const registerRes = await request(app).post("/api/auth/register").send(validRegisterBody);
    const firstCookie = registerRes.headers["set-cookie"][0];

    const refreshRes = await request(app).post("/api/auth/refresh").set("Cookie", firstCookie);
    expect(refreshRes.status).toBe(200);
    expect(refreshRes.body.accessToken).toEqual(expect.any(String));

    // The old refresh token was rotated out - replaying it must fail.
    const replay = await request(app).post("/api/auth/refresh").set("Cookie", firstCookie);
    expect(replay.status).toBe(401);
  });

  it("logout revokes the refresh token", async () => {
    const registerRes = await request(app).post("/api/auth/register").send(validRegisterBody);
    const cookie = registerRes.headers["set-cookie"][0];

    const logoutRes = await request(app).post("/api/auth/logout").set("Cookie", cookie);
    expect(logoutRes.status).toBe(204);

    const refreshAfterLogout = await request(app).post("/api/auth/refresh").set("Cookie", cookie);
    expect(refreshAfterLogout.status).toBe(401);
  });
});
