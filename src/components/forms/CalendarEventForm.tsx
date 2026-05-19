"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import {
  calendarEventSchema,
  type CalendarEventFormData,
} from "@/lib/validations/calendar";

interface CalendarEventFormProps {
  onSuccess?: (data?: CalendarEventFormData) => void;
  defaultValues?: Partial<CalendarEventFormData> & { id?: string };
}

const eventTypeOptions = [
  { label: "Task", value: "Task" },
  { label: "Meeting", value: "Meeting" },
  { label: "Deadline", value: "Deadline" },
  { label: "Invoice", value: "Invoice" },
  { label: "Personal", value: "Personal" },
];

export function CalendarEventForm({
  onSuccess,
  defaultValues,
}: CalendarEventFormProps) {
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CalendarEventFormData>({
    resolver: zodResolver(calendarEventSchema),
    defaultValues: defaultValues || {
      title: "",
      date: "",
      time: "",
      website_id: null,
      event_type: "",
      notes: "",
    },
  });

  function onSubmit(data: CalendarEventFormData) {
    reset();
    onSuccess?.(data);
  }

  const websiteOptions = [
    { label: "Personal", value: "personal" },
    ...websites.map((w: any) => ({ label: w.name, value: w.id })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Title
        </label>
        <input
          {...register("title")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Event title"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.date && (
            <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Time
          </label>
          <input
            type="time"
            {...register("time")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Website
        </label>
        <Controller
          name="website_id"
          control={control}
          render={({ field }) => (
            <Select
              options={websiteOptions}
              value={field.value || "personal"}
              onValueChange={(val) =>
                field.onChange(val === "personal" ? null : val)
              }
              placeholder="Select website"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Type
        </label>
        <Controller
          name="event_type"
          control={control}
          render={({ field }) => (
            <Select
              options={eventTypeOptions}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select type"
              className="mt-1"
            />
          )}
        />
        {errors.event_type && (
          <p className="text-xs text-red-500 mt-1">
            {errors.event_type.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Notes
        </label>
        <textarea
          {...register("notes")}
          rows={3}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          placeholder="Additional notes..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Add Event
        </button>
      </div>
    </form>
  );
}
