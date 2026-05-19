"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { noteSchema, type NoteFormData } from "@/lib/validations/notes";
import { hashPassword, generateRandomSlug, generatePassword } from "@/lib/crypto";

interface NoteFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<NoteFormData> & { id?: string };
}

export function NoteForm({ onSuccess, defaultValues }: NoteFormProps) {
  const { insert, update, loading } = useSupabaseMutation("notes");
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: defaultValues || {
      title: "",
      content: "",
      website_id: null,
      tags: "",
      is_public: false,
      slug: "",
      thumbnail_url: "",
    },
  });

  async function onSubmit(data: NoteFormData) {
    data.slug = generateRandomSlug(8);

    if (data.password_hash) {
      data.password_hash = await hashPassword(data.password_hash);
    } else {
      data.password_hash = null;
    }

    const tags = data.tags
      ? data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const payload = { ...data, tags } as any;

    if (defaultValues?.id) {
      const result = await update(defaultValues.id, payload);
      if (result) {
        toast.success("Note updated successfully");
        onSuccess?.();
      } else {
        toast.error("Failed to update note");
      }
    } else {
      const result = await insert(payload);
      if (result) {
        toast.success("Note created successfully");
        reset();
        onSuccess?.();
      } else {
        toast.error("Failed to create note");
      }
    }
  }

  const websiteOptions = [
    { label: "General", value: "general" },
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
          placeholder="Note title"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Content
        </label>
        <textarea
          {...register("content")}
          rows={5}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          placeholder="Write your note..."
        />
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
              value={field.value || "general"}
              onValueChange={(val) =>
                field.onChange(val === "general" ? null : val)
              }
              placeholder="Select website"
              className="mt-1"
            />
          )}
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Thumbnail
        </label>
        <Controller
          name="thumbnail_url"
          control={control}
          render={({ field }) => <FileUpload value={field.value} onChange={field.onChange} className="mt-1" />}
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Tags
        </label>
        <input
          {...register("tags")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="comma separated"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">Password (optional)</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="password"
            {...register("password_hash")}
            placeholder="Leave empty for no password"
            className="flex-1 h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => setValue("password_hash", generatePassword(16))}
            className="px-3 h-9 bg-muted rounded-md text-xs font-medium hover:bg-muted/80 transition-colors shrink-0"
          >
            Generate
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_public")}
          className="rounded border-border"
        />
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Public
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
          {loading ? "Saving..." : defaultValues?.id ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
