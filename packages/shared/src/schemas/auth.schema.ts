import { z } from "zod";
import { emailSchema, MESSAGES, nameSchema, passwordSchema, slugSchema } from "./common.schema.js";

/**
 * Registers the first user of a brand-new company. The caller always
 * becomes the company's OWNER - there is no way to pass a role in, which is
 * what closes the client-side privilege-escalation hole the legacy Firebase
 * flow had.
 */
export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, MESSAGES.required),
    companyName: z.string().trim().min(2, "Must be at least 2 characters.").max(80),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match.",
    path: ["passwordConfirm"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, MESSAGES.required),
});
export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Completes an invite: the invitee never chooses their own role or company -
 * both were fixed server-side when the invite was created (see
 * invite.schema.ts / companies module).
 */
export const acceptInviteSchema = z
  .object({
    token: z.string().min(1, MESSAGES.required),
    firstName: nameSchema,
    lastName: nameSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, MESSAGES.required),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match.",
    path: ["passwordConfirm"],
  });
export type AcceptInviteInput = z.infer<typeof acceptInviteSchema>;

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  companyId: z.string(),
  companyName: z.string(),
  companySlug: slugSchema,
  role: z.enum(["OWNER", "ADMIN", "STAFF"]),
});
export type AuthUser = z.infer<typeof authUserSchema>;

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: authUserSchema,
});
export type AuthResponse = z.infer<typeof authResponseSchema>;
