"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { Select } from "@/components/ui/select";
import {
  pastebinSchema,
  type PastebinFormData,
} from "@/lib/validations/pastebin";
import { hashPassword, generateRandomSlug, generatePassword } from "@/lib/crypto";

interface PastebinFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<PastebinFormData> & { id?: string };
}

const languageOptions = [
  { label: "TypeScript", value: "TypeScript" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "SQL", value: "SQL" },
  { label: "CSS", value: "CSS" },
  { label: "HTML", value: "HTML" },
  { label: "Python", value: "Python" },
  { label: "Bash", value: "Bash" },
  { label: "JSON", value: "JSON" },
];

export function PastebinForm({ onSuccess, defaultValues }: PastebinFormProps) {
  const { insert, update, loading } = useSupabaseMutation("pastebin_entries");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<PastebinFormData>({
    resolver: zodResolver(pastebinSchema),
    defaultValues: defaultValues || {
      title: "",
      language: "",
      content: "",
      is_public: false,
    },
  });

  async function onSubmit(data: PastebinFormData) {
    if (data.password_hash) {
      data.password_hash = await hashPassword(data.password_hash);
    } else {
      data.password_hash = null;
    }
    if (data.is_public && !data.share_token) {
      data.share_token = generateRandomSlug(12);
    }

    if (defaultValues?.id) {
      const result = await update(defaultValues.id, data as any);
      if (result) {
        toast.success("Paste updated successfully");
        onSuccess?.();
      } else {
        toast.error("Failed to update paste");
      }
    } else {
      const result = await insert(data as any);
      if (result) {
        toast.success("Paste created successfully");
        reset();
        onSuccess?.();
      } else {
        toast.error("Failed to create paste");
      }
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
          placeholder="Paste title"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Language
        </label>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Select
              options={languageOptions}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select language"
              className="mt-1"
            />
          )}
        />
        {errors.language && (
          <p className="text-xs text-red-500 mt-1">
            {errors.language.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Content
        </label>
        <textarea
          {...register("content")}
          rows={8}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none font-mono"
          placeholder="Paste your code..."
        />
        {errors.content && (
          <p className="text-xs text-red-500 mt-1">
            {errors.content.message}
          </p>
        )}
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
