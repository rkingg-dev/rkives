"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import { taskSchema, type TaskFormData } from "@/lib/validations/tasks";

interface TaskFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<TaskFormData> & { id?: string };
}

const taskTypeOptions = [
  { label: "Bug", value: "Bug" },
  { label: "Feature", value: "Feature" },
  { label: "Maintenance", value: "Maintenance" },
  { label: "Content", value: "Content" },
  { label: "Personal", value: "Personal" },
];

const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
  { label: "Urgent", value: "Urgent" },
];

export function TaskForm({ onSuccess, defaultValues }: TaskFormProps) {
  const { insert, update, loading } = useSupabaseMutation("tasks");
  const isEdit = !!defaultValues?.id;
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const websiteOptions = [
    { label: "Personal", value: "" },
    ...websites.map((w) => ({
      label: w.name,
      value: w.id,
    })),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      website_id: null,
      task_type: "",
      priority: "Medium",
      due_date: "",
      assigned_to: "R King",
      is_recurring: false,
    },
  });

  async function onSubmit(data: TaskFormData) {
    const result = isEdit
      ? await update(defaultValues!.id!, data as any)
      : await insert(data as any);
    if (result) {
      toast.success(isEdit ? "Task updated successfully" : "Task created successfully");
      reset();
      onSuccess?.();
    } else {
      toast.error(isEdit ? "Failed to update task" : "Failed to create task");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Title
        </label>
        <input
          {...register("title")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Website
        </label>
        <Controller
          control={control}
          name="website_id"
          render={({ field }) => (
            <Select
              options={websiteOptions}
              value={field.value ?? ""}
              onValueChange={(v) => field.onChange(v || null)}
              placeholder="Select website..."
              className="mt-1"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Type
          </label>
          <Controller
            control={control}
            name="task_type"
            render={({ field }) => (
              <Select
                options={taskTypeOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Select type..."
                className="mt-1"
              />
            )}
          />
          {errors.task_type && (
            <p className="text-xs text-red-500 mt-1">{errors.task_type.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Priority
          </label>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select
                options={priorityOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Select priority..."
                className="mt-1"
              />
            )}
          />
          {errors.priority && (
            <p className="text-xs text-red-500 mt-1">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Due Date
          </label>
          <input
            type="date"
            {...register("due_date")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Assigned To
          </label>
          <input
            {...register("assigned_to")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_recurring")}
          className="rounded border-border"
        />
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Recurring
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onSuccess}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
