import { z } from "@hono/zod-openapi";

export const leadSchema = z
  .object({
    source: z.enum(["contact", "lead", "estimate"]).openapi({ example: "contact" }),
    name: z
      .string()
      .min(1, "Name is required")
      .max(200)
      .openapi({ example: "Jane Doe" })
      .transform((s) => s.trim()),
    email: z.string().email().max(256).optional().openapi({ example: "jane@example.com" }),
    phone: z.string().min(1, "Phone is required").max(50).openapi({ example: "+1234567890" }),
    message: z.string().optional(),
    projectType: z.string().optional(),
    service: z.string().optional(),
    scope: z.string().optional(),
    address: z.string().optional(),
    addressOptional: z.string().optional(),
    notes: z.string().optional(),
    lead_source: z.string().optional(),
    zip: z.string().optional(),
    utm: z.record(z.string()).optional(),
  })
  .openapi("LeadRequest");

export type LeadData = z.infer<typeof leadSchema>;

export const leadSuccessSchema = z
  .object({
    ok: z.literal(true),
    message: z.string(),
    id: z.string().optional(),
  })
  .openapi("LeadSuccess");

export const errorSchema = z
  .object({
    ok: z.literal(false).optional(),
    error: z.string(),
  })
  .openapi("Error");
