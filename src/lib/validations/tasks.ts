import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  website_id: z.string().optional().nullable().default(null),
  task_type: z.string().min(1, "Type is required"),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  due_date: z.string().optional().default(""),
  assigned_to: z.string().optional().default("R King"),
  is_recurring: z.boolean().optional().default(false),
  status: z.string().optional().default("To Do"),
  notes: z.string().optional().default(""),
});

export type TaskFormData = z.infer<typeof taskSchema>;
