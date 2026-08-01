import type { CreateCategoryInput, ReorderCategoriesInput, UpdateCategoryInput } from "@manegio/shared";
import { AppError } from "../../middleware/app-error.js";
import { categoriesRepository } from "./categories.repository.js";

/**
 * All methods take `companyId` explicitly, resolved by tenant.middleware
 * from the caller's membership. Nothing here ever trusts a companyId from
 * the request body/params - see categories.controller.ts.
 */
export const categoriesService = {
  list(companyId: string) {
    return categoriesRepository.listByCompany(companyId);
  },

  async create(companyId: string, input: CreateCategoryInput) {
    const taken = await categoriesRepository.nameTaken(companyId, input.name);
    if (taken) {
      throw AppError.conflict("A category with this name already exists.");
    }
    const position = await categoriesRepository.nextPosition(companyId);
    return categoriesRepository.create(companyId, input, position);
  },

  async update(companyId: string, id: string, input: UpdateCategoryInput) {
    const existing = await categoriesRepository.findByIdInCompany(id, companyId);
    if (!existing) {
      throw AppError.notFound("Category not found.");
    }
    if (input.name) {
      const taken = await categoriesRepository.nameTaken(companyId, input.name, id);
      if (taken) {
        throw AppError.conflict("A category with this name already exists.");
      }
    }
    await categoriesRepository.update(id, companyId, input);
    return categoriesRepository.findByIdInCompany(id, companyId);
  },

  async delete(companyId: string, id: string) {
    const existing = await categoriesRepository.findByIdInCompany(id, companyId);
    if (!existing) {
      throw AppError.notFound("Category not found.");
    }
    await categoriesRepository.delete(id, companyId);
  },

  async reorder(companyId: string, input: ReorderCategoriesInput) {
    const existing = await categoriesRepository.listByCompany(companyId);
    const existingIds = new Set(existing.map((c) => c.id));
    const allBelongToCompany = input.orderedIds.every((id) => existingIds.has(id));
    if (!allBelongToCompany || input.orderedIds.length !== existing.length) {
      throw AppError.badRequest("orderedIds must match this company's categories exactly.");
    }
    await categoriesRepository.reorder(companyId, input.orderedIds);
    return categoriesRepository.listByCompany(companyId);
  },
};
