import { prisma } from "../../config/prisma.js";
import type { CreateProductInput, UpdateProductInput } from "@manegio/shared";

export const productsRepository = {
  listByCompany(companyId: string) {
    return prisma.product.findMany({
      where: { companyId },
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
      include: { category: { select: { id: true, name: true } } },
    });
  },

  findByIdInCompany(id: string, companyId: string) {
    return prisma.product.findFirst({
      where: { id, companyId },
      include: { category: { select: { id: true, name: true } } },
    });
  },

  categoryBelongsToCompany(categoryId: string, companyId: string) {
    return prisma.category.findFirst({ where: { id: categoryId, companyId }, select: { id: true } });
  },

  async nextPosition(companyId: string): Promise<number> {
    const last = await prisma.product.findFirst({
      where: { companyId },
      orderBy: { position: "desc" },
      select: { position: true },
    });
    return (last?.position ?? -1) + 1;
  },

  create(companyId: string, input: CreateProductInput, position: number) {
    return prisma.product.create({
      data: {
        companyId,
        name: input.name,
        description: input.description || null,
        priceCents: input.priceCents,
        categoryId: input.categoryId ?? null,
        isPublished: input.isPublished ?? false,
        imageUrl: input.imageUrl ?? null,
        position,
      },
      include: { category: { select: { id: true, name: true } } },
    });
  },

  async update(id: string, companyId: string, data: UpdateProductInput & { imageUrl?: string | null }) {
    await prisma.product.updateMany({ where: { id, companyId }, data });
    return productsRepository.findByIdInCompany(id, companyId);
  },

  delete(id: string, companyId: string) {
    return prisma.product.deleteMany({ where: { id, companyId } });
  },

  async reorder(companyId: string, orderedIds: string[]) {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.product.updateMany({ where: { id, companyId }, data: { position: index } }),
      ),
    );
  },

  countAll(companyId: string) {
    return prisma.product.count({ where: { companyId } });
  },

  countPublished(companyId: string) {
    return prisma.product.count({ where: { companyId, isPublished: true } });
  },

  nameTaken(companyId: string, name: string, excludeId?: string) {
    return prisma.product.findFirst({
      where: { companyId, name, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    });
  },
};
