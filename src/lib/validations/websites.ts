import { z } from "zod";

export const websiteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  client_id: z.string().min(1, "Client is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  platform: z.string().min(1, "Platform is required"),
  hosting_provider: z.string().optional().default(""),
  domain_provider: z.string().optional().default(""),
  domain_expiry: z.string().optional().default(""),
  monthly_maintenance_fee: z.coerce.number().min(0).optional().default(0),
  scope: z.string().optional().default(""),
  is_portfolio: z.boolean().optional().default(false),
  slug: z.string().optional().default(""),
  login_url: z.string().optional().default(""),
  project_type: z.string().optional().default(""),
  domain_name: z.string().optional().default(""),
  hosting_expiry: z.string().optional().default(""),
  status: z.string().optional().default("Live"),
  project_start: z.string().optional().default(""),
  deploy_date: z.string().optional().default(""),
  description: z.string().optional().default(""),
  full_description: z.string().optional().default(""),
  thumbnail_url: z.string().optional().default(""),
  role: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

export type WebsiteFormData = z.infer<typeof websiteSchema>;
