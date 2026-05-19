"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import { websiteSchema, type WebsiteFormData } from "@/lib/validations/websites";

interface WebsiteFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<WebsiteFormData> & { id?: string };
}

const platformOptions = [
  { label: "WordPress", value: "WordPress" },
  { label: "Next.js", value: "Next.js" },
  { label: "Webflow", value: "Webflow" },
  { label: "Other", value: "Other" },
];

export function WebsiteForm({ onSuccess, defaultValues }: WebsiteFormProps) {
  const { insert, update, loading } = useSupabaseMutation("websites");
  const isEdit = !!defaultValues?.id;
  const { data: clients } = useSupabaseQuery({ table: "clients" });

  const clientOptions = clients.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<WebsiteFormData>({
    resolver: zodResolver(websiteSchema),
    defaultValues: defaultValues || {
      name: "",
      client_id: "",
      url: "",
      platform: "",
      hosting_provider: "",
      domain_provider: "",
      domain_expiry: "",
      monthly_maintenance_fee: 0,
      scope: "",
      is_portfolio: false,
    },
  });

  async function onSubmit(data: WebsiteFormData) {
    const result = isEdit
      ? await update(defaultValues!.id!, data as any)
      : await insert(data as any);
    if (result) {
      toast.success(isEdit ? "Website updated successfully" : "Website created successfully");
      reset();
      onSuccess?.();
    } else {
      toast.error(isEdit ? "Failed to update website" : "Failed to create website");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Name
        </label>
        <input
          {...register("name")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Client
        </label>
        <Controller
          control={control}
          name="client_id"
          render={({ field }) => (
            <Select
              options={clientOptions}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select client..."
              className="mt-1"
            />
          )}
        />
        {errors.client_id && (
          <p className="text-xs text-red-500 mt-1">{errors.client_id.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          URL
        </label>
        <input
          {...register("url")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.url && (
          <p className="text-xs text-red-500 mt-1">{errors.url.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Platform
        </label>
        <Controller
          control={control}
          name="platform"
          render={({ field }) => (
            <Select
              options={platformOptions}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select platform..."
              className="mt-1"
            />
          )}
        />
        {errors.platform && (
          <p className="text-xs text-red-500 mt-1">{errors.platform.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Hosting Provider
          </label>
          <input
            {...register("hosting_provider")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Domain Provider
          </label>
          <input
            {...register("domain_provider")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Domain Expiry
          </label>
          <input
            type="date"
            {...register("domain_expiry")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Monthly Fee
          </label>
          <input
            type="number"
            {...register("monthly_maintenance_fee")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Scope
        </label>
        <textarea
          {...register("scope")}
          rows={2}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_portfolio")}
          className="rounded border-border"
        />
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Portfolio
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
