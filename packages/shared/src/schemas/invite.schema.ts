import { z } from "zod";
import { emailSchema } from "./common.schema.js";

/**
 * OWNER/ADMIN issues an invite for a fixed email + role. The invite token is
 * generated server-side (invite.service) and emailed/shared out-of-band -
 * the role travels with the server-issued token, never as client input at
 * accept-time (see auth.schema#acceptInviteSchema).
 */
export const createInviteSchema = z.object({
  email: emailSchema,
  role: z.enum(["ADMIN", "STAFF"]),
});
export type CreateInviteInput = z.infer<typeof createInviteSchema>;

export const updateMemberRoleSchema = z.object({
  role: z.enum(["ADMIN", "STAFF"]),
});
export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>;
