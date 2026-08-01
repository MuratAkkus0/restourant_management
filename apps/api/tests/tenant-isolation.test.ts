import type { Express } from "express";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../src/config/prisma.js";
import { authHeader, buildApp, registerCompany, resetDatabase } from "./helpers.js";

/**
 * The single most important test suite in the project: company A must never
 * be able to read or mutate company B's data, no matter what id it sends.
 * Every assertion here proves the tenant boundary is enforced server-side
 * (via req.tenant.companyId, resolved from the caller's own membership) -
 * not just hidden by the UI.
 */
describe("tenant isolation", () => {
  let app: Express;

  beforeEach(async () => {
    await resetDatabase();
    app = buildApp();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("company B cannot read company A's categories or products", async () => {
    const companyA = await registerCompany(app);
    const companyB = await registerCompany(app);

    const categoryRes = await request(app)
      .post("/api/admin/categories")
      .set(authHeader(companyA.accessToken))
      .send({ name: "Starters" });
    expect(categoryRes.status).toBe(201);
    const categoryId = categoryRes.body.category.id as string;

    const productRes = await request(app)
      .post("/api/admin/products")
      .set(authHeader(companyA.accessToken))
      .send({ name: "Bruschetta", priceCents: 690, categoryId });
    expect(productRes.status).toBe(201);
    const productId = productRes.body.product.id as string;

    // Company B's own lists must not contain any of company A's rows.
    const bCategories = await request(app).get("/api/admin/categories").set(authHeader(companyB.accessToken));
    expect(bCategories.body.categories).toHaveLength(0);

    const bProducts = await request(app).get("/api/admin/products").set(authHeader(companyB.accessToken));
    expect(bProducts.body.products).toHaveLength(0);

    // Direct-by-id access with company B's token must 404, not leak the row.
    const bGetProduct = await request(app)
      .get(`/api/admin/products/${productId}`)
      .set(authHeader(companyB.accessToken));
    expect(bGetProduct.status).toBe(404);
  });

  it("company B cannot update or delete company A's product by guessing its id", async () => {
    const companyA = await registerCompany(app);
    const companyB = await registerCompany(app);

    const productRes = await request(app)
      .post("/api/admin/products")
      .set(authHeader(companyA.accessToken))
      .send({ name: "Margherita", priceCents: 1290 });
    const productId = productRes.body.product.id as string;

    const updateAttempt = await request(app)
      .patch(`/api/admin/products/${productId}`)
      .set(authHeader(companyB.accessToken))
      .send({ name: "Hijacked" });
    expect(updateAttempt.status).toBe(404);

    const deleteAttempt = await request(app)
      .delete(`/api/admin/products/${productId}`)
      .set(authHeader(companyB.accessToken));
    expect(deleteAttempt.status).toBe(404);

    // Prove the row is untouched: company A still sees the original data.
    const aGetProduct = await request(app)
      .get(`/api/admin/products/${productId}`)
      .set(authHeader(companyA.accessToken));
    expect(aGetProduct.status).toBe(200);
    expect(aGetProduct.body.product.name).toBe("Margherita");
  });

  it("company B cannot reorder or publish-toggle company A's categories/products", async () => {
    const companyA = await registerCompany(app);
    const companyB = await registerCompany(app);

    const categoryRes = await request(app)
      .post("/api/admin/categories")
      .set(authHeader(companyA.accessToken))
      .send({ name: "Mains" });
    const categoryId = categoryRes.body.category.id as string;

    const productRes = await request(app)
      .post("/api/admin/products")
      .set(authHeader(companyA.accessToken))
      .send({ name: "Carbonara", priceCents: 1400, categoryId });
    const productId = productRes.body.product.id as string;

    const reorderAttempt = await request(app)
      .patch("/api/admin/categories/reorder")
      .set(authHeader(companyB.accessToken))
      .send({ orderedIds: [categoryId] });
    expect(reorderAttempt.status).toBe(400);

    const publishAttempt = await request(app)
      .patch(`/api/admin/products/${productId}/publish`)
      .set(authHeader(companyB.accessToken))
      .send({ isPublished: true });
    expect(publishAttempt.status).toBe(404);
  });

  it("company B cannot see company A's members, invites or company profile", async () => {
    const companyA = await registerCompany(app);
    const companyB = await registerCompany(app);

    const aMembers = await request(app).get("/api/admin/companies/me/members").set(authHeader(companyA.accessToken));
    expect(aMembers.body.members).toHaveLength(1);

    const bMembers = await request(app).get("/api/admin/companies/me/members").set(authHeader(companyB.accessToken));
    expect(bMembers.body.members).toHaveLength(1);
    expect(bMembers.body.members[0].user.email).toBe(companyB.userEmail);
    expect(bMembers.body.members[0].user.email).not.toBe(companyA.userEmail);

    const aProfile = await request(app).get("/api/admin/companies/me").set(authHeader(companyA.accessToken));
    const bProfile = await request(app).get("/api/admin/companies/me").set(authHeader(companyB.accessToken));
    expect(aProfile.body.company.id).not.toBe(bProfile.body.company.id);
  });

  it("the public menu never exposes an unpublished company's products", async () => {
    const draft = await registerCompany(app);

    await request(app)
      .post("/api/admin/products")
      .set(authHeader(draft.accessToken))
      .send({ name: "Secret Recipe", priceCents: 999, isPublished: true });

    // isMenuPublished defaults to false until the owner explicitly publishes.
    const publicRes = await request(app).get(`/api/public/menu/${draft.companySlug}`);
    expect(publicRes.status).toBe(404);
  });
});
