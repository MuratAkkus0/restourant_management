import { Router } from "express";
import {
  createInviteSchema,
  updateCompanySchema,
  updateMemberRoleSchema,
  updateOpeningHoursSchema,
} from "@manegio/shared";
import { requireRole } from "../../middleware/tenant.middleware.js";
import { validate } from "../../middleware/validate.js";
import { companiesController } from "./companies.controller.js";

const router = Router();

router.get("/me", companiesController.getProfile);
router.patch("/me", requireRole("OWNER", "ADMIN"), validate(updateCompanySchema), companiesController.updateProfile);

router.get("/me/opening-hours", companiesController.getOpeningHours);
router.put(
  "/me/opening-hours",
  requireRole("OWNER", "ADMIN"),
  validate(updateOpeningHoursSchema),
  companiesController.updateOpeningHours,
);

router.get("/me/stats", companiesController.getStats);

router.get("/me/members", companiesController.listMembers);
router.patch(
  "/me/members/:membershipId",
  requireRole("OWNER", "ADMIN"),
  validate(updateMemberRoleSchema),
  companiesController.updateMemberRole,
);
router.delete("/me/members/:membershipId", requireRole("OWNER", "ADMIN"), companiesController.removeMember);

router.get("/me/invites", requireRole("OWNER", "ADMIN"), companiesController.listInvites);
router.post(
  "/me/invites",
  requireRole("OWNER", "ADMIN"),
  validate(createInviteSchema),
  companiesController.createInvite,
);
router.delete("/me/invites/:inviteId", requireRole("OWNER", "ADMIN"), companiesController.revokeInvite);

export default router;
