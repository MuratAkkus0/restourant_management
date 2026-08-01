import { Router } from "express";
import { z } from "zod";
import { requireRole } from "../../middleware/tenant.middleware.js";
import { validate } from "../../middleware/validate.js";
import { menusController } from "./menus.controller.js";

const setPublishedSchema = z.object({ isPublished: z.boolean() });

const router = Router();

router.get("/", menusController.getAdminMenu);
router.patch(
  "/publish",
  requireRole("OWNER", "ADMIN"),
  validate(setPublishedSchema),
  menusController.setPublished,
);

export default router;
