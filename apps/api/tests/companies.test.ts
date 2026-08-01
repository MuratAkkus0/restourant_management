import type { Express } from "express";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../src/config/prisma.js";
import { authHeader, buildApp, registerCompany, resetDatabase } from "./helpers.js";

describe("companies - members & invites", () => {
  let app: Express;

  beforeEach(async () => {
    await resetDatabase();
    app = buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("an ADMIN cannot invite another ADMIN, only the OWNER can", async () => {
    const owner = await registerCompany(app);

    const staffInvite = await request(app)
      .post("/api/admin/companies/me/invites")
      .set(authHeader(owner.accessToken))
      .send({ email: "admin-to-be@example.com", role: "ADMIN" });
    expect(staffInvite.status).toBe(201);

    const token = new URL(staffInvite.body.invite.acceptUrl).searchParams.get("token")!;
    const accept = await request(app).post("/api/auth/accept-invite").send({
      token,
      firstName: "Alex",
      lastName: "Admin",
      password: "Password123",
      passwordConfirm: "Password123",
    });
    const adminToken = accept.body.accessToken as string;
    expect(accept.body.user.role).toBe("ADMIN");

    const forbiddenInvite = await request(app)
      .post("/api/admin/companies/me/invites")
      .set(authHeader(adminToken))
      .send({ email: "second-admin@example.com", role: "ADMIN" });
    expect(forbiddenInvite.status).toBe(403);
  });

  it("an invite token can only be accepted once", async () => {
    const owner = await registerCompany(app);
    const invite = await request(app)
      .post("/api/admin/companies/me/invites")
      .set(authHeader(owner.accessToken))
      .send({ email: "staff@example.com", role: "STAFF" });
    const token = new URL(invite.body.invite.acceptUrl).searchParams.get("token")!;

    const body = { token, firstName: "Sam", lastName: "Staff", password: "Password123", passwordConfirm: "Password123" };
    const first = await request(app).post("/api/auth/accept-invite").send(body);
    expect(first.status).toBe(200);

    const second = await request(app).post("/api/auth/accept-invite").send(body);
    expect(second.status).toBe(400);
  });

  it("the owner cannot be removed and a member cannot remove themselves", async () => {
    const owner = await registerCompany(app);
    const members = await request(app).get("/api/admin/companies/me/members").set(authHeader(owner.accessToken));
    const ownerMembershipId = members.body.members[0].id as string;

    const removeSelf = await request(app)
      .delete(`/api/admin/companies/me/members/${ownerMembershipId}`)
      .set(authHeader(owner.accessToken));
    expect(removeSelf.status).toBe(403);
  });
});
