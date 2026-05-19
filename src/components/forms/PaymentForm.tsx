"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Select } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { paymentSchema, type PaymentFormData } from "@/lib/validations/payments";

interface PaymentFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<PaymentFormData> & { id?: string };
}

const paymentTypeOptions = [
  { label: "Monthly Maintenance", value: "Monthly Maintenance" },
  { label: "Project Payment", value: "Project Payment" },
  { label: "Hosting", value: "Hosting" },
  { label: "Domain", value: "Domain" },
  { label: "One-time", value: "One-time" },
];

const methodOptions = [
  { label: "GCash", value: "GCash" },
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "PayPal", value: "PayPal" },
  { label: "Cash", value: "Cash" },
];

export function PaymentForm({ onSuccess, defaultValues }: PaymentFormProps) {
  const { insert, update, loading } = useSupabaseMutation("payments");
  const isEdit = !!defaultValues?.id;
  const { data: clients } = useSupabaseQuery({ table: "clients" });
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const clientOptions = clients.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const websiteOptions = [
    { label: "General", value: "" },
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
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: defaultValues || {
      client_id: "",
      website_id: null,
      amount: 0,
      payment_type: "",
      method: "",
      reference_number: "",
      billing_period: "",
      notes: "",
    },
  });

  async function onSubmit(data: PaymentFormData) {
    const result = isEdit
      ? await update(defaultValues!.id!, data as any)
      : await insert(data as any);
    if (result) {
      toast.success(isEdit ? "Payment updated successfully" : "Payment created successfully");
      reset();
      onSuccess?.();
    } else {
      toast.error(isEdit ? "Failed to update payment" : "Failed to create payment");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            Amount
          </label>
          <input
            type="number"
            {...register("amount")}
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.amount && (
            <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Billing Period
          </label>
          <input
            {...register("billing_period")}
            placeholder="Aug 2024"
            className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Type
          </label>
          <Controller
            control={control}
            name="payment_type"
            render={({ field }) => (
              <Select
                options={paymentTypeOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Select type..."
                className="mt-1"
              />
            )}
          />
          {errors.payment_type && (
            <p className="text-xs text-red-500 mt-1">{errors.payment_type.message}</p>
          )}
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider">
            Method
          </label>
          <Controller
            control={control}
            name="method"
            render={({ field }) => (
              <Select
                options={methodOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Select method..."
                className="mt-1"
              />
            )}
          />
          {errors.method && (
            <p className="text-xs text-red-500 mt-1">{errors.method.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Reference Number
        </label>
        <input
          {...register("reference_number")}
          className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Receipt
        </label>
        <Controller
          name="receipt_url"
          control={control}
          render={({ field }) => <FileUpload value={field.value} onChange={field.onChange} className="mt-1" />}
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Notes
        </label>
        <textarea
          {...register("notes")}
          rows={2}
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
