/**
 * Deterministic demo data for local development: one published company with
 * a real (if small) menu, and a second, unpublished company - handy for
 * manually verifying tenant isolation and the public-menu publish gate.
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const ownerPasswordHash = await bcrypt.hash("Password123", 12);

  const trattoria = await prisma.company.upsert({
    where: { slug: "trattoria-bella" },
    update: {},
    create: {
      name: "Trattoria Bella",
      slug: "trattoria-bella",
      description: "Family-run Italian kitchen serving fresh pasta and wood-fired pizza.",
      phone: "+49 30 1234567",
      street: "Hauptstrasse",
      houseNo: "12",
      postalCode: "10115",
      city: "Berlin",
      country: "Germany",
      isMenuPublished: true,
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: "owner@trattoria-bella.test" },
    update: {},
    create: {
      email: "owner@trattoria-bella.test",
      passwordHash: ownerPasswordHash,
      firstName: "Giulia",
      lastName: "Romano",
    },
  });

  await prisma.membership.upsert({
    where: { userId_companyId: { userId: owner.id, companyId: trattoria.id } },
    update: {},
    create: { userId: owner.id, companyId: trattoria.id, role: "OWNER" },
  });

  const starters = await prisma.category.upsert({
    where: { companyId_name: { companyId: trattoria.id, name: "Starters" } },
    update: {},
    create: { companyId: trattoria.id, name: "Starters", position: 0 },
  });
  const mains = await prisma.category.upsert({
    where: { companyId_name: { companyId: trattoria.id, name: "Main Courses" } },
    update: {},
    create: { companyId: trattoria.id, name: "Main Courses", position: 1 },
  });

  const products: Array<{
    name: string;
    description: string;
    priceCents: number;
    categoryId: string;
    position: number;
  }> = [
    {
      name: "Bruschetta al Pomodoro",
      description: "Grilled sourdough, San Marzano tomatoes, basil, extra-virgin olive oil.",
      priceCents: 690,
      categoryId: starters.id,
      position: 0,
    },
    {
      name: "Burrata e Prosciutto",
      description: "Creamy burrata, Parma ham, rocket, aged balsamic.",
      priceCents: 1190,
      categoryId: starters.id,
      position: 1,
    },
    {
      name: "Tagliatelle al Ragu",
      description: "Slow-cooked beef ragu, fresh egg tagliatelle, parmesan.",
      priceCents: 1590,
      categoryId: mains.id,
      position: 0,
    },
    {
      name: "Margherita",
      description: "Wood-fired pizza, San Marzano tomato, fior di latte, basil.",
      priceCents: 1290,
      categoryId: mains.id,
      position: 1,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { companyId_name: { companyId: trattoria.id, name: product.name } },
      update: {},
      create: { ...product, companyId: trattoria.id, isPublished: true },
    });
  }

  // A second tenant with a draft (unpublished) menu, used by the tenant
  // isolation tests and to manually confirm company B never leaks into A.
  const bakery = await prisma.company.upsert({
    where: { slug: "corner-bakery" },
    update: {},
    create: {
      name: "Corner Bakery",
      slug: "corner-bakery",
      description: "Neighbourhood bakery and coffee counter.",
      city: "Berlin",
      country: "Germany",
      isMenuPublished: false,
    },
  });

  const bakeryOwner = await prisma.user.upsert({
    where: { email: "owner@corner-bakery.test" },
    update: {},
    create: {
      email: "owner@corner-bakery.test",
      passwordHash: ownerPasswordHash,
      firstName: "Lena",
      lastName: "Fischer",
    },
  });

  await prisma.membership.upsert({
    where: { userId_companyId: { userId: bakeryOwner.id, companyId: bakery.id } },
    update: {},
    create: { userId: bakeryOwner.id, companyId: bakery.id, role: "OWNER" },
  });

  console.log("Seed complete:");
  console.log("  Trattoria Bella  - owner@trattoria-bella.test / Password123 (menu published)");
  console.log("  Corner Bakery    - owner@corner-bakery.test / Password123 (menu draft)");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
