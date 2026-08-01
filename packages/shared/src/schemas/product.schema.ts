import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Product name is required.").max(80),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  // Price is handled in whole cents everywhere to avoid float rounding bugs.
  priceCents: z
    .number({ message: "Price must be a number." })
    .int("Price must not have sub-cent precision.")
    .min(0, "Price cannot be negative.")
    .max(100_000_00, "Price is too large."),
  categoryId: z.string().min(1).nullable().optional(),
  isPublished: z.boolean().optional().default(false),
  imageUrl: z.string().url().nullable().optional(),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const reorderProductsSchema = z.object({
  orderedIds: z.array(z.string().min(1)).min(1, "Provide at least one product id."),
});
export type ReorderProductsInput = z.infer<typeof reorderProductsSchema>;
