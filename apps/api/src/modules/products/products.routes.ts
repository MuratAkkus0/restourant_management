import { Router } from "express";
import { z } from "zod";
import { createProductSchema, reorderProductsSchema, updateProductSchema } from "@manegio/shared";
import { requireRole } from "../../middleware/tenant.middleware.js";
import { validate } from "../../middleware/validate.js";
import { productsController } from "./products.controller.js";

const setPublishedSchema = z.object({ isPublished: z.boolean() });

const router = Router();

router.get("/", productsController.list);
router.get("/:id", productsController.get);
router.post("/", requireRole("OWNER", "ADMIN"), validate(createProductSchema), productsController.create);
router.patch(
  "/reorder",
  requireRole("OWNER", "ADMIN"),
  validate(reorderProductsSchema),
  productsController.reorder,
);
router.patch(
  "/:id/publish",
  requireRole("OWNER", "ADMIN", "STAFF"),
  validate(setPublishedSchema),
  productsController.setPublished,
);
router.patch("/:id", requireRole("OWNER", "ADMIN"), validate(updateProductSchema), productsController.update);
router.delete("/:id", requireRole("OWNER", "ADMIN"), productsController.remove);

export default router;
