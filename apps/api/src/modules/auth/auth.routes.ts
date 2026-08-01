import { Router } from "express";
import { acceptInviteSchema, loginSchema, registerSchema } from "@manegio/shared";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { authRateLimiter } from "../../middleware/rate-limit.js";
import { validate } from "../../middleware/validate.js";
import { authController } from "./auth.controller.js";

const router = Router();

router.use(authRateLimiter);

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/accept-invite", validate(acceptInviteSchema), authController.acceptInvite);
router.get("/me", requireAuth, authController.me);

export default router;
