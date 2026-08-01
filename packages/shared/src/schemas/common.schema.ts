import { z } from "zod";

/** Shared, human-readable validation messages so client and server agree. */
export const MESSAGES = {
  required: "This field is required.",
  email: "Please enter a valid email address.",
  passwordMin: "Password must be at least 8 characters long.",
  passwordMax: "Password must be at most 72 characters long.",
  passwordComplexity:
    "Password must contain at least one lowercase letter and one digit.",
};

const PASSWORD_RULES = /^(?=.*[a-z])(?=.*\d)[\s\S]{8,72}$/;

export const passwordSchema = z
  .string()
  .min(8, MESSAGES.passwordMin)
  .max(72, MESSAGES.passwordMax)
  .regex(PASSWORD_RULES, MESSAGES.passwordComplexity);

// Accepts unicode letters (umlauts, accents, etc.), spaces, apostrophes and
// hyphens, e.g. "Müller", "Öztürk", "O'Brien-Schröder".
const NAME_RULES = /^[\p{L}][\p{L} '-]*$/u;

export const nameSchema = z
  .string()
  .trim()
  .min(1, MESSAGES.required)
  .max(60, "Must be at most 60 characters.")
  .regex(NAME_RULES, "Can only contain letters, spaces, hyphens and apostrophes.");

export const emailSchema = z.string().trim().min(1, MESSAGES.required).email(MESSAGES.email);

/** URL-safe company slug used in the public menu route (`/menu/:slug`). */
export const slugSchema = z
  .string()
  .trim()
  .min(3, "Must be at least 3 characters.")
  .max(60, "Must be at most 60 characters.")
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only.");

export const cuidSchema = z.string().min(1, "Invalid id.");

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
