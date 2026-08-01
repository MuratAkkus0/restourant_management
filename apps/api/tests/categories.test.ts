import type { Express } from "express";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../src/config/prisma.js";
import { authHeader, buildApp, registerCompany, resetDatabase } from "./helpers.js";

describe("categories", () => {
  let app: Express;

  beforeEach(async () => {
    await resetDatabase();
    app = buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates, lists, updates, reorders and deletes categories", async () => {
    const owner = await registerCompany(app);

    const create1 = await request(app)
      .post("/api/admin/categories")
      .set(authHeader(owner.accessToken))
      .send({ name: "Starters" });
    expect(create1.status).toBe(201);

    const create2 = await request(app)
      .post("/api/admin/categories")
      .set(authHeader(owner.accessToken))
      .send({ name: "Mains" });
    expect(create2.status).toBe(201);

    const list = await request(app).get("/api/admin/categories").set(authHeader(owner.accessToken));
    expect(list.body.categories.map((c: { name: string }) => c.name)).toEqual(["Starters", "Mains"]);

    const reorder = await request(app)
      .patch("/api/admin/categories/reorder")
      .set(authHeader(owner.accessToken))
      .send({ orderedIds: [create2.body.category.id, create1.body.category.id] });
    expect(reorder.status).toBe(200);
    expect(reorder.body.categories.map((c: { name: string }) => c.name)).toEqual(["Mains", "Starters"]);

    const update = await request(app)
      .patch(`/api/admin/categories/${create1.body.category.id}`)
      .set(authHeader(owner.accessToken))
      .send({ name: "Starters & Salads" });
    expect(update.status).toBe(200);
    expect(update.body.category.name).toBe("Starters & Salads");

    const del = await request(app)
      .delete(`/api/admin/categories/${create1.body.category.id}`)
      .set(authHeader(owner.accessToken));
    expect(del.status).toBe(204);

    const finalList = await request(app).get("/api/admin/categories").set(authHeader(owner.accessToken));
    expect(finalList.body.categories).toHaveLength(1);
  });

  it("rejects duplicate category names within the same company", async () => {
    const owner = await registerCompany(app);
    await request(app).post("/api/admin/categories").set(authHeader(owner.accessToken)).send({ name: "Drinks" });
    const dup = await request(app).post("/api/admin/categories").set(authHeader(owner.accessToken)).send({ name: "Drinks" });
    expect(dup.status).toBe(409);
  });

  it("rejects an empty category name", async () => {
    const owner = await registerCompany(app);
    const res = await request(app).post("/api/admin/categories").set(authHeader(owner.accessToken)).send({ name: "" });
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
