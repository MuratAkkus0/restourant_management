import type { CreateProductInput, ReorderProductsInput, UpdateProductInput } from "@manegio/shared";
import { AppError } from "../../middleware/app-error.js";
import { uploadsService } from "../uploads/uploads.service.js";
import { productsRepository } from "./products.repository.js";

async function assertCategoryBelongsToCompany(categoryId: string | null | undefined, companyId: string) {
  if (!categoryId) return;
  const category = await productsRepository.categoryBelongsToCompany(categoryId, companyId);
  if (!category) {
    throw AppError.badRequest("categoryId does not belong to this company.");
  }
}

export const productsService = {
  list(companyId: string) {
    return productsRepository.listByCompany(companyId);
  },

  async get(companyId: string, id: string) {
    const product = await productsRepository.findByIdInCompany(id, companyId);
    if (!product) {
      throw AppError.notFound("Product not found.");
    }
    return product;
  },

  async create(companyId: string, input: CreateProductInput) {
    await assertCategoryBelongsToCompany(input.categoryId, companyId);
    const taken = await productsRepository.nameTaken(companyId, input.name);
    if (taken) {
      throw AppError.conflict("A product with this name already exists.");
    }
    const position = await productsRepository.nextPosition(companyId);
    return productsRepository.create(companyId, input, position);
  },

  async update(companyId: string, id: string, input: UpdateProductInput) {
    const existing = await productsRepository.findByIdInCompany(id, companyId);
    if (!existing) {
      throw AppError.notFound("Product not found.");
    }
    if (input.categoryId !== undefined) {
      await assertCategoryBelongsToCompany(input.categoryId, companyId);
    }
    if (input.name) {
      const taken = await productsRepository.nameTaken(companyId, input.name, id);
      if (taken) {
        throw AppError.conflict("A product with this name already exists.");
      }
    }

    // Replacing/clearing an image should not leave the old file orphaned on disk.
    if (input.imageUrl !== undefined && existing.imageUrl && existing.imageUrl !== input.imageUrl) {
      await uploadsService.deleteImageByUrl(existing.imageUrl);
    }

    return productsRepository.update(id, companyId, input);
  },

  async delete(companyId: string, id: string) {
    const existing = await productsRepository.findByIdInCompany(id, companyId);
    if (!existing) {
      throw AppError.notFound("Product not found.");
    }
    await productsRepository.delete(id, companyId);
    await uploadsService.deleteImageByUrl(existing.imageUrl);
  },

  async setPublished(companyId: string, id: string, isPublished: boolean) {
    const existing = await productsRepository.findByIdInCompany(id, companyId);
    if (!existing) {
      throw AppError.notFound("Product not found.");
    }
    return productsRepository.update(id, companyId, { isPublished });
  },

  async reorder(companyId: string, input: ReorderProductsInput) {
    const existing = await productsRepository.listByCompany(companyId);
    const existingIds = new Set(existing.map((p) => p.id));
    const allBelongToCompany = input.orderedIds.every((id) => existingIds.has(id));
    if (!allBelongToCompany || input.orderedIds.length !== existing.length) {
      throw AppError.badRequest("orderedIds must match this company's products exactly.");
    }
    await productsRepository.reorder(companyId, input.orderedIds);
    return productsRepository.listByCompany(companyId);
  },
};
