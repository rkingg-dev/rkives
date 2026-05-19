"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import {
  projectSchema,
  type ProjectFormData,
} from "@/lib/validations/projects";

interface ProjectFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<ProjectFormData> & { id?: string };
}

const projectTypeOptions = [
  { label: "Full Build", value: "Full Build" },
  { label: "Redesign", value: "Redesign" },
  { label: "Landing Page", value: "Landing Page" },
  { label: "Web App", value: "Web App" },
  { label: "SEO", value: "SEO" },
  { label: "Portfolio", value: "Portfolio" },
  { label: "Integration", value: "Integration" },
];

export function ProjectForm({ onSuccess, defaultValues }: ProjectFormProps) {
  const { insert, update, loading } = useSupabaseMutation("projects");
  const isEdit = !!defaultValues?.id;
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: defaultValues || {
      name: "",
      website_id: "",
      project_type: "",
      deadline: "",
      progress: 0,
      status: "Planning",
    },
  });

  async function onSubmit(data: ProjectFormData) {
    const result = isEdit
      ? await update(defaultValues!.id!, data as any)
      : await insert(data as any);
    if (result) {
      toast.success(isEdit ? "Project updated successfully" : "Project created successfully");
      reset();
      onSuccess?.();
    } else {
      toast.error(isEdit ? "Failed to update project" : "Failed to create project");
    }
  }

  const websiteOptions = websites.map((w: any) => ({
    label: w.name,
    value: w.id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Name
        </label>
        <input
          {...register("name")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Project name"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
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
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select website"
              className="mt-1"
            />
          )}
        />
        {errors.website_id && (
          <p className="text-xs text-red-500 mt-1">
            {errors.website_id.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Type
        </label>
        <Controller
          name="project_type"
          control={control}
          render={({ field }) => (
            <Select
              options={projectTypeOptions}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select type"
              className="mt-1"
            />
          )}
        />
        {errors.project_type && (
          <p className="text-xs text-red-500 mt-1">
            {errors.project_type.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Deadline
        </label>
        <input
          type="date"
          {...register("deadline")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Progress (%)
        </label>
        <input
          type="number"
          min={0}
          max={100}
          {...register("progress", { valueAsNumber: true })}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.progress && (
          <p className="text-xs text-red-500 mt-1">
            {errors.progress.message}
          </p>
        )}
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
