"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export default function TaskCompletionRate() {
  const { data: tasks } = useSupabaseQuery({ table: "tasks" });

  const stats = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - dayOfWeek);

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    const endOfLastWeek = new Date(startOfWeek);

    const thisWeek = tasks.filter((t) => {
      if (t.status !== "Done" || !t.completed_at) return false;
      const completed = new Date(t.completed_at);
      return completed >= startOfWeek;
    }).length;

    const lastWeek = tasks.filter((t) => {
      if (t.status !== "Done" || !t.completed_at) return false;
      const completed = new Date(t.completed_at);
      return completed >= startOfLastWeek && completed < endOfLastWeek;
    }).length;

    const change = lastWeek > 0 ? ((thisWeek - lastWeek) / lastWeek * 100).toFixed(0) : thisWeek > 0 ? "100" : "0";

    return { thisWeek, lastWeek, change: Number(change) };
  }, [tasks]);

  const up = stats.change >= 0;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-[var(--accent-brand)]" />
        <h3 className="text-sm font-semibold text-foreground">Task Velocity</h3>
      </div>

      <div className="flex items-end gap-3 mb-2">
        <span className="text-2xl font-bold text-foreground">{stats.thisWeek}</span>
        <span className={cn(
          "flex items-center gap-0.5 text-xs font-medium mb-1",
          up ? "text-emerald-500" : "text-red-500"
        )}>
          {up ? "+" : ""}{stats.change}%
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>This week</span>
        <span className="text-border">|</span>
        <span>Last week: {stats.lastWeek}</span>
      </div>
    </div>
  );
}
