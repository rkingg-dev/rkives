"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { CheckSquare, CreditCard, Activity } from "lucide-react";

export default function RecentActivityWidget() {
  const { data: recentTasks } = useSupabaseQuery({ table: "tasks", orderBy: { column: "created_at", ascending: false }, limit: 5 });
  const { data: recentPayments } = useSupabaseQuery({ table: "payments", orderBy: { column: "created_at", ascending: false }, limit: 5 });

  const activity = useMemo(() => [
    ...recentTasks.map((t: any) => ({
      id: t.id,
      icon: CheckSquare,
      color: "text-blue-500",
      title: t.title,
      desc: `${t.status} · ${t.priority}`,
      time: t.created_at,
    })),
    ...recentPayments.map((p: any) => ({
      id: p.id,
      icon: CreditCard,
      color: "text-emerald-500",
      title: `₱${p.amount?.toLocaleString()} payment`,
      desc: p.status,
      time: p.created_at,
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8), [recentTasks, recentPayments]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4 text-[var(--accent-brand)]" />
        Recent Activity
      </h3>
      {activity.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activity.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className={`mt-0.5 ${item.color}`}><item.icon className="h-4 w-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(item.time).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
