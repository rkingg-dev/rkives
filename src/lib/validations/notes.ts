import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional().default(""),
  website_id: z.string().optional().nullable().default(null),
  tags: z.string().optional().default(""),
  is_public: z.boolean().optional().default(false),
  slug: z.string().optional().default(""),
  thumbnail_url: z.string().optional().default(""),
});

export type NoteFormData = z.infer<typeof noteSchema>;
