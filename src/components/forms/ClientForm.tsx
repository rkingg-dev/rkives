"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { clientSchema, type ClientFormData } from "@/lib/validations/clients";

interface ClientFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<ClientFormData> & { id?: string };
}

export function ClientForm({ onSuccess, defaultValues }: ClientFormProps) {
  const { insert, update, loading } = useSupabaseMutation("clients");
  const isEdit = !!defaultValues?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultValues || {
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  async function onSubmit(data: ClientFormData) {
    const result = isEdit
      ? await update(defaultValues!.id!, data as any)
      : await insert(data as any);
    if (result) {
      toast.success(isEdit ? "Client updated successfully" : "Client created successfully");
      reset();
      onSuccess?.();
    } else {
      toast.error(isEdit ? "Failed to update client" : "Failed to create client");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
            Company
          </label>
          <input
            {...register("company")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Phone
          </label>
          <input
            {...register("phone")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Address
        </label>
        <input
          {...register("address")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Notes
        </label>
        <textarea
          {...register("notes")}
          rows={3}
          className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
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
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
