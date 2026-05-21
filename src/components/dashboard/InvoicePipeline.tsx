"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

const statusOrder = ["Draft", "Sent", "Pending", "Verified", "Paid"] as const;

const statusColors: Record<string, string> = {
  Draft: "bg-gray-400",
  Sent: "bg-blue-500",
  Pending: "bg-amber-500",
  Verified: "bg-emerald-500",
  Paid: "bg-emerald-600",
};

export default function InvoicePipeline() {
  const { data: payments } = useSupabaseQuery({ table: "payments" });

  const pipeline = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const status of statusOrder) {
      counts[status] = payments.filter((p) => p.status === status).length;
    }
    return counts;
  }, [payments]);

  const total = Object.values(pipeline).reduce((sum, n) => sum + n, 0);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-[var(--accent-brand)]" />
          Invoice Pipeline
        </h3>
        <span className="text-xs text-muted-foreground">{total} total</span>
      </div>

      {/* Pipeline bar */}
      <div className="flex h-2 rounded-full overflow-hidden bg-muted mb-3">
        {statusOrder.map((status) => {
          const count = pipeline[status];
          if (!count) return null;
          return (
            <div
              key={status}
              className={statusColors[status]}
              style={{ width: `${(count / total) * 100}%` }}
              title={`${status}: ${count}`}
            />
          );
        })}
      </div>

      {/* Status labels */}
      <div className="space-y-1.5">
        {statusOrder.map((status) => {
          const count = pipeline[status];
          if (!count) return null;
          return (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                <span className="text-xs text-foreground">{status}</span>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{count}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <Link href="/dashboard/payments" className="text-xs text-[var(--accent-brand)] hover:underline flex items-center gap-1">
          Manage invoices <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
