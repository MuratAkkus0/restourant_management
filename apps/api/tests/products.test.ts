import type { Express } from "express";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../src/config/prisma.js";
import { authHeader, buildApp, registerCompany, resetDatabase } from "./helpers.js";

describe("products", () => {
  let app: Express;

  beforeEach(async () => {
    await resetDatabase();
    app = buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a product, rejects a categoryId from another company, and toggles publish state", async () => {
    const owner = await registerCompany(app);
    const other = await registerCompany(app);

    const otherCategory = await request(app)
      .post("/api/admin/categories")
      .set(authHeader(other.accessToken))
      .send({ name: "Foreign Category" });

    const crossTenantCreate = await request(app)
      .post("/api/admin/products")
      .set(authHeader(owner.accessToken))
      .send({ name: "Pizza", priceCents: 1200, categoryId: otherCategory.body.category.id });
    expect(crossTenantCreate.status).toBe(400);

    const create = await request(app)
      .post("/api/admin/products")
      .set(authHeader(owner.accessToken))
      .send({ name: "Pizza", priceCents: 1200 });
    expect(create.status).toBe(201);
    expect(create.body.product.isPublished).toBe(false);

    const publish = await request(app)
      .patch(`/api/admin/products/${create.body.product.id}/publish`)
      .set(authHeader(owner.accessToken))
      .send({ isPublished: true });
    expect(publish.status).toBe(200);
    expect(publish.body.product.isPublished).toBe(true);
  });

  it("rejects a negative or non-integer price", async () => {
    const owner = await registerCompany(app);

    const negative = await request(app)
      .post("/api/admin/products")
      .set(authHeader(owner.accessToken))
      .send({ name: "Broken Price", priceCents: -100 });
    expect(negative.status).toBe(400);

    const fractional = await request(app)
      .post("/api/admin/products")
      .set(authHeader(owner.accessToken))
      .send({ name: "Broken Price", priceCents: 10.5 });
    expect(fractional.status).toBe(400);
  });

  it("a STAFF member can toggle publish but cannot create or delete products", async () => {
    const owner = await registerCompany(app);
    const invite = await request(app)
      .post("/api/admin/companies/me/invites")
      .set(authHeader(owner.accessToken))
      .send({ email: "staff@example.com", role: "STAFF" });
    const token = new URL(invite.body.invite.acceptUrl).searchParams.get("token")!;

    const accept = await request(app).post("/api/auth/accept-invite").send({
      token,
      firstName: "Sam",
      lastName: "Staff",
      password: "Password123",
      passwordConfirm: "Password123",
    });
    const staffToken = accept.body.accessToken as string;

    const createAttempt = await request(app)
      .post("/api/admin/products")
      .set(authHeader(staffToken))
      .send({ name: "Should Not Exist", priceCents: 100 });
    expect(createAttempt.status).toBe(403);

    const product = await request(app)
      .post("/api/admin/products")
      .set(authHeader(owner.accessToken))
      .send({ name: "Soup", priceCents: 500 });

    const toggle = await request(app)
      .patch(`/api/admin/products/${product.body.product.id}/publish`)
      .set(authHeader(staffToken))
      .send({ isPublished: true });
    expect(toggle.status).toBe(200);

    const deleteAttempt = await request(app)
      .delete(`/api/admin/products/${product.body.product.id}`)
      .set(authHeader(staffToken));
    expect(deleteAttempt.status).toBe(403);
  });
});
