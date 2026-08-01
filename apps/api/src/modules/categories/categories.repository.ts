import { prisma } from "../../config/prisma.js";
import type { CreateCategoryInput, UpdateCategoryInput } from "@manegio/shared";

export const categoriesRepository = {
  listByCompany(companyId: string) {
    return prisma.category.findMany({
      where: { companyId },
      orderBy: { position: "asc" },
      include: { _count: { select: { products: true } } },
    });
  },

  findByIdInCompany(id: string, companyId: string) {
    return prisma.category.findFirst({ where: { id, companyId } });
  },

  async nextPosition(companyId: string): Promise<number> {
    const last = await prisma.category.findFirst({
      where: { companyId },
      orderBy: { position: "desc" },
      select: { position: true },
    });
    return (last?.position ?? -1) + 1;
  },

  async create(companyId: string, input: CreateCategoryInput, position: number) {
    return prisma.category.create({
      data: { companyId, name: input.name, position },
    });
  },

  update(id: string, companyId: string, input: UpdateCategoryInput) {
    return prisma.category.updateMany({ where: { id, companyId }, data: input });
  },

  delete(id: string, companyId: string) {
    return prisma.category.deleteMany({ where: { id, companyId } });
  },

  async reorder(companyId: string, orderedIds: string[]) {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.category.updateMany({ where: { id, companyId }, data: { position: index } }),
      ),
    );
  },

  nameTaken(companyId: string, name: string, excludeId?: string) {
    return prisma.category.findFirst({
      where: { companyId, name, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    });
  },
};
