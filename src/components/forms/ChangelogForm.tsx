"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import {
  changelogSchema,
  type ChangelogFormData,
} from "@/lib/validations/changelog";

interface ChangelogFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<ChangelogFormData> & { id?: string };
}

const entryTypeOptions = [
  { label: "Feature", value: "Feature" },
  { label: "Fix", value: "Fix" },
  { label: "Update", value: "Update" },
  { label: "Security", value: "Security" },
  { label: "Maintenance", value: "Maintenance" },
];

export function ChangelogForm({ onSuccess, defaultValues }: ChangelogFormProps) {
  const { insert, update, loading } = useSupabaseMutation("changelog_entries");
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ChangelogFormData>({
    resolver: zodResolver(changelogSchema),
    defaultValues: defaultValues || {
      website_id: "",
      entry_type: "",
      title: "",
      version: "",
      content: "",
      is_published: true,
    },
  });

  async function onSubmit(data: ChangelogFormData) {
    if (defaultValues?.id) {
      const result = await update(defaultValues.id, data as any);
      if (result) {
        toast.success("Changelog entry updated");
        onSuccess?.();
      } else {
        toast.error("Failed to update entry");
      }
    } else {
      const result = await insert(data as any);
      if (result) {
        toast.success("Changelog entry created");
        reset();
        onSuccess?.();
      } else {
        toast.error("Failed to create entry");
      }
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
          name="entry_type"
          control={control}
          render={({ field }) => (
            <Select
              options={entryTypeOptions}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select type"
              className="mt-1"
            />
          )}
        />
        {errors.entry_type && (
          <p className="text-xs text-red-500 mt-1">
            {errors.entry_type.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Title
        </label>
        <input
          {...register("title")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Entry title"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Version
        </label>
        <input
          {...register("version")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="v1.0.0"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Content
        </label>
        <textarea
          {...register("content")}
          rows={4}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          placeholder="Describe the changes..."
        />
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
          {loading ? "Saving..." : defaultValues?.id ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
