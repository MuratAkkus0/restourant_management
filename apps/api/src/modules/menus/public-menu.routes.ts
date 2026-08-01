import { Router } from "express";
import { menusController } from "./menus.controller.js";

const router = Router();

// No auth, no tenant middleware: this is the QR-code landing page, reachable
// by anyone. It only ever returns published data (see menus.service).
router.get("/:companySlug", menusController.getPublicMenu);

export default router;
