import { z } from "zod";

export const utmSchema = z
  .object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional()
  })
  .optional();

export const leadInputSchema = z.object({
  source: z.enum([
    "enquire_modal",
    "counseling_booking",
    "contact_page",
    "apply_flow"
  ]),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone is required"),
  city: z.string().optional(),
  preferredIntake: z.string().optional(),
  interest: z.string().optional(),
  notes: z.string().optional(),
  utm: utmSchema,
  pageUrl: z.string().optional()
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export interface Lead extends LeadInput {
  id: string;
  createdAt: string;
}

