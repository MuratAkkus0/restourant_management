import type { Express } from "express";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../src/config/prisma.js";
import { authHeader, buildApp, registerCompany, resetDatabase } from "./helpers.js";

describe("public menu", () => {
  let app: Express;

  beforeEach(async () => {
    await resetDatabase();
    app = buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("404s for an unknown slug and for an unpublished company", async () => {
    const owner = await registerCompany(app);

    const unknown = await request(app).get("/api/public/menu/does-not-exist");
    expect(unknown.status).toBe(404);

    const unpublished = await request(app).get(`/api/public/menu/${owner.companySlug}`);
    expect(unpublished.status).toBe(404);
  });

  it("only returns published products, grouped by category, once the menu is published", async () => {
    const owner = await registerCompany(app);

    const category = await request(app)
      .post("/api/admin/categories")
      .set(authHeader(owner.accessToken))
      .send({ name: "Mains" });

    const published = await request(app)
      .post("/api/admin/products")
      .set(authHeader(owner.accessToken))
      .send({ name: "Published Dish", priceCents: 1000, categoryId: category.body.category.id, isPublished: true });

    await request(app)
      .post("/api/admin/products")
      .set(authHeader(owner.accessToken))
      .send({ name: "Draft Dish", priceCents: 1000, categoryId: category.body.category.id, isPublished: false });

    await request(app)
      .patch("/api/admin/menu/publish")
      .set(authHeader(owner.accessToken))
      .send({ isPublished: true });

    const res = await request(app).get(`/api/public/menu/${owner.companySlug}`);
    expect(res.status).toBe(200);
    expect(res.body.categories).toHaveLength(1);
    expect(res.body.categories[0].products).toHaveLength(1);
    expect(res.body.categories[0].products[0].id).toBe(published.body.product.id);
  });
});
