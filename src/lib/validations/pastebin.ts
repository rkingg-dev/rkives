import { z } from "zod";

export const pastebinSchema = z.object({
  title: z.string().min(1, "Title is required"),
  language: z.string().min(1, "Language is required"),
  content: z.string().min(1, "Content is required"),
  is_public: z.boolean().optional().default(false),
});

export type PastebinFormData = z.infer<typeof pastebinSchema>;
