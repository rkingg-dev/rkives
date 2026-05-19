import { z } from "zod";

export const calendarEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional().default(""),
  website_id: z.string().optional().nullable().default(null),
  event_type: z.string().min(1, "Type is required"),
  notes: z.string().optional().default(""),
});

export type CalendarEventFormData = z.infer<typeof calendarEventSchema>;
