import { z } from "zod";

export const paymentSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  website_id: z.string().optional().nullable().default(null),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  payment_type: z.string().min(1, "Type is required"),
  method: z.string().min(1, "Method is required"),
  reference_number: z.string().optional().default(""),
  receipt_url: z.string().optional().default(""),
  billing_period: z.string().optional().default(""),
  status: z.string().optional().default("Pending"),
  notes: z.string().optional().default(""),
  currency: z.string().optional().default("PHP"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
