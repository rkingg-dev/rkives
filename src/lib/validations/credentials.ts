import { z } from "zod";

export const credentialSchema = z.object({
  website_id: z.string().min(1, "Website is required"),
  label: z.string().min(1, "Label is required"),
  url: z.string().optional().default(""),
  username: z.string().optional().default(""),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  password_value: z.string().optional().default(""),
  totp_secret: z.string().optional().nullable().default(null),
  is_internal: z.boolean().optional().default(true),
  notes: z.string().optional().default(""),
});

export type CredentialFormData = z.infer<typeof credentialSchema>;
