import { Router } from "express";
import { createCategorySchema, reorderCategoriesSchema, updateCategorySchema } from "@manegio/shared";
import { requireRole } from "../../middleware/tenant.middleware.js";
import { validate } from "../../middleware/validate.js";
import { categoriesController } from "./categories.controller.js";

const router = Router();

router.get("/", categoriesController.list);
router.post("/", requireRole("OWNER", "ADMIN"), validate(createCategorySchema), categoriesController.create);
router.patch(
  "/reorder",
  requireRole("OWNER", "ADMIN"),
  validate(reorderCategoriesSchema),
  categoriesController.reorder,
);
router.patch(
  "/:id",
  requireRole("OWNER", "ADMIN"),
  validate(updateCategorySchema),
  categoriesController.update,
);
router.delete("/:id", requireRole("OWNER", "ADMIN"), categoriesController.remove);

export default router;
