"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import { credentialSchema, type CredentialFormData } from "@/lib/validations/credentials";

function generatePassword(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

interface CredentialFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<CredentialFormData> & { id?: string };
}

export function CredentialForm({ onSuccess, defaultValues }: CredentialFormProps) {
  const { insert, update, loading } = useSupabaseMutation("website_credentials");
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const websiteOptions = websites.map((w) => ({
    label: w.name,
    value: w.id,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<CredentialFormData>({
    resolver: zodResolver(credentialSchema),
    defaultValues: defaultValues || {
      website_id: "",
      label: "",
      url: "",
      username: "",
      email: "",
      password_value: "",
      totp_secret: null,
      is_internal: true,
    },
  });

  async function onSubmit(data: CredentialFormData) {
    if (defaultValues?.id) {
      const result = await update(defaultValues.id, data as any);
      if (result) {
        toast.success("Credential updated successfully");
        onSuccess?.();
      } else {
        toast.error("Failed to update credential");
      }
    } else {
      const result = await insert(data as any);
      if (result) {
        toast.success("Credential created successfully");
        reset();
        onSuccess?.();
      } else {
        toast.error("Failed to create credential");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select website..."
              className="mt-1"
            />
          )}
        />
        {errors.website_id && (
          <p className="text-xs text-red-500 mt-1">{errors.website_id.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Label
        </label>
        <input
          {...register("label")}
          placeholder="WordPress Admin, Hosting, etc."
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.label && (
          <p className="text-xs text-red-500 mt-1">{errors.label.message}</p>
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Username
          </label>
          <input
            {...register("username")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Password
        </label>
        <div className="flex items-center gap-2">
          <input
            type="password"
            {...register("password_value")}
            className="mt-1 flex-1 h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => setValue("password_value", generatePassword())}
            className="mt-1 px-3 h-9 bg-muted rounded-md text-xs font-medium hover:bg-muted/80 transition-colors shrink-0"
          >
            Generate
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          TOTP Secret
        </label>
        <input
          {...register("totp_secret")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("is_internal")}
          className="rounded border-border"
        />
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Internal
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
