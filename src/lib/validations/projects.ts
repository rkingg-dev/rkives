import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  website_id: z.string().min(1, "Website is required"),
  project_type: z.string().min(1, "Type is required"),
  deadline: z.string().optional().default(""),
  progress: z.coerce.number().min(0).max(100).optional().default(0),
  status: z.string().optional().default("Planning"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
