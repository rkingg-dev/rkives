"use client";

import { useMemo, useState } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { cn } from "@/lib/utils";
import { DollarSign, Clock, CheckCircle, AlertCircle, Check, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function PendingPayments() {
  const { data: payments, refetch } = useSupabaseQuery({ table: "payments" });
  const { update } = useSupabaseMutation("payments");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const pending = payments.filter((p) => p.status === "Pending");
    const pendingTotal = pending.reduce((sum, p) => sum + p.amount, 0);

    const verified = payments.filter((p) => p.status === "Verified");
    const verifiedTotal = verified.reduce((sum, p) => sum + p.amount, 0);

    const totalOutstanding = payments
      .filter((p) => p.status !== "Verified" && p.status !== "Paid")
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      pending,
      pendingCount: pending.length,
      pendingTotal,
      verifiedCount: verified.length,
      verifiedTotal,
      totalOutstanding,
    };
  }, [payments]);

  async function handleVerify(id: string) {
    setProcessingId(id);
    const result = await update(id, { status: "Verified", paid_at: new Date().toISOString() });
    if (result) {
      toast.success("Payment verified");
      refetch();
    } else {
      toast.error("Failed to verify payment");
    }
    setProcessingId(null);
  }

  async function handleReject(id: string) {
    setProcessingId(id);
    const result = await update(id, { status: "Rejected" });
    if (result) {
      toast.success("Payment rejected");
      refetch();
    } else {
      toast.error("Failed to reject payment");
    }
    setProcessingId(null);
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-[var(--accent-brand)]" />
          Payments
        </h3>
        <Link href="/dashboard/payments" className="text-xs text-[var(--accent-brand)] hover:underline">
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {/* Pending with inline actions */}
        <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <div>
                <p className="text-xs font-medium text-foreground">Pending</p>
                <p className="text-[10px] text-muted-foreground">{stats.pendingCount} receipt{stats.pendingCount !== 1 ? "s" : ""}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-amber-500">
              ₱{stats.pendingTotal.toLocaleString()}
            </span>
          </div>
          {/* Quick actions for pending payments */}
          {stats.pending.slice(0, 3).map((p) => (
            <div key={p.id} className="flex items-center justify-between py-1.5 border-t border-amber-500/10 first:border-0">
              <span className="text-[10px] text-muted-foreground truncate">₱{p.amount?.toLocaleString()}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleVerify(p.id)}
                  disabled={processingId === p.id}
                  className="p-1 rounded hover:bg-emerald-500/10 transition-colors disabled:opacity-50"
                  title="Verify"
                >
                  <Check className="h-3 w-3 text-emerald-500" />
                </button>
                <button
                  onClick={() => handleReject(p.id)}
                  disabled={processingId === p.id}
                  className="p-1 rounded hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  title="Reject"
                >
                  <X className="h-3 w-3 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verified */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <div>
              <p className="text-xs font-medium text-foreground">Verified</p>
              <p className="text-[10px] text-muted-foreground">{stats.verifiedCount} payment{stats.verifiedCount !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-emerald-500">
            ₱{stats.verifiedTotal.toLocaleString()}
          </span>
        </div>

        {/* Outstanding */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs font-medium text-foreground">Outstanding</p>
          </div>
          <span className="text-sm font-semibold text-foreground">
            ₱{stats.totalOutstanding.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
