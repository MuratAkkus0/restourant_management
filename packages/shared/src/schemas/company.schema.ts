import { z } from "zod";
import { slugSchema } from "./common.schema.js";

export const updateCompanySchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  slug: slugSchema.optional(),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  street: z.string().trim().max(120).optional().or(z.literal("")),
  houseNo: z.string().trim().max(20).optional().or(z.literal("")),
  postalCode: z.string().trim().max(20).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
});
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

export const WEEKDAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;
export type Weekday = (typeof WEEKDAYS)[number];

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const openingHourSchema = z
  .object({
    dayOfWeek: z.enum(WEEKDAYS),
    isClosed: z.boolean().default(false),
    opensAt: z.string().regex(TIME_RE, "Use HH:MM (24h).").nullable().optional(),
    closesAt: z.string().regex(TIME_RE, "Use HH:MM (24h).").nullable().optional(),
  })
  .refine(
    (h) => h.isClosed || (h.opensAt && h.closesAt && h.opensAt < h.closesAt),
    { message: "Opening time must be before closing time.", path: ["closesAt"] },
  );
export type OpeningHourInput = z.infer<typeof openingHourSchema>;

export const updateOpeningHoursSchema = z.object({
  hours: z.array(openingHourSchema).length(7, "Provide all 7 days of the week."),
});
export type UpdateOpeningHoursInput = z.infer<typeof updateOpeningHoursSchema>;
