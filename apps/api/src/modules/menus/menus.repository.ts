import { prisma } from "../../config/prisma.js";

export const menusRepository = {
  /** Full composition (published + unpublished) for the admin menu editor. */
  getAdminMenu(companyId: string) {
    return prisma.category.findMany({
      where: { companyId },
      orderBy: { position: "asc" },
      include: {
        products: { orderBy: { position: "asc" } },
      },
    });
  },

  getUncategorizedProducts(companyId: string) {
    return prisma.product.findMany({
      where: { companyId, categoryId: null },
      orderBy: { position: "asc" },
    });
  },

  /** Only exposes what a public visitor is allowed to see - no auth, no draft data. */
  findPublishedCompanyBySlug(slug: string) {
    return prisma.company.findFirst({
      where: { slug, isMenuPublished: true },
      select: {
        name: true,
        slug: true,
        description: true,
        logoUrl: true,
        phone: true,
        categories: {
          orderBy: { position: "asc" },
          select: {
            id: true,
            name: true,
            products: {
              where: { isPublished: true },
              orderBy: { position: "asc" },
              select: { id: true, name: true, description: true, priceCents: true, imageUrl: true },
            },
          },
        },
      },
    });
  },
};
