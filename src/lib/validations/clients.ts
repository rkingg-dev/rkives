import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional().default(""),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional().default(""),
  address: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

export type ClientFormData = z.infer<typeof clientSchema>;
