import { Router } from "express";
import multer from "multer";
import { requireRole } from "../../middleware/tenant.middleware.js";
import { uploadsController } from "./uploads.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = Router();

router.post("/", requireRole("OWNER", "ADMIN"), upload.single("file"), uploadsController.uploadImage);

export default router;
