import { z } from "zod";

export const changelogSchema = z.object({
  website_id: z.string().min(1, "Website is required"),
  entry_type: z.string().min(1, "Type is required"),
  title: z.string().min(1, "Title is required"),
  version: z.string().optional().nullable().default(null),
  content: z.string().optional().default(""),
  is_published: z.boolean().optional().default(true),
});

export type ChangelogFormData = z.infer<typeof changelogSchema>;
