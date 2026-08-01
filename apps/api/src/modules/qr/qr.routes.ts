import { Router } from "express";
import { qrController } from "./qr.controller.js";

const router = Router();

router.get("/", qrController.get);
router.get("/meta", qrController.getMeta);

export default router;
