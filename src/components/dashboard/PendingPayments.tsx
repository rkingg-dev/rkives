"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PendingPayments() {
  const { data: payments } = useSupabaseQuery({ table: "payments" });

  const stats = useMemo(() => {
    const pending = payments.filter((p) => p.status === "Pending");
    const pendingTotal = pending.reduce((sum, p) => sum + p.amount, 0);

    const verified = payments.filter((p) => p.status === "Verified");
    const verifiedTotal = verified.reduce((sum, p) => sum + p.amount, 0);

    const totalOutstanding = payments
      .filter((p) => p.status !== "Verified" && p.status !== "Paid")
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      pendingCount: pending.length,
      pendingTotal,
      verifiedCount: verified.length,
      verifiedTotal,
      totalOutstanding,
    };
  }, [payments]);

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
        {/* Pending */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
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
