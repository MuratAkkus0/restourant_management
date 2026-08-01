import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required.").max(60),
});
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const reorderCategoriesSchema = z.object({
  orderedIds: z.array(z.string().min(1)).min(1, "Provide at least one category id."),
});
export type ReorderCategoriesInput = z.infer<typeof reorderCategoriesSchema>;
