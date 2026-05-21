"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { monthlyRevenue } from "@/lib/finance-data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";

export default function MonthlyComparison() {
  const { data: tasks } = useSupabaseQuery({ table: "tasks" });

  const comparison = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;

    // Revenue from finance data
    const currentData = monthlyRevenue[monthlyRevenue.length - 1];
    const prevData = monthlyRevenue.length > 1 ? monthlyRevenue[monthlyRevenue.length - 2] : null;

    const revenueChange = prevData
      ? ((currentData.revenue - prevData.revenue) / prevData.revenue * 100).toFixed(0)
      : "0";
    const expenseChange = prevData
      ? ((((currentData.expenses + currentData.personal) - (prevData.expenses + prevData.personal)) / (prevData.expenses + prevData.personal)) * 100).toFixed(0)
      : "0";

    // Tasks completed this month vs last month
    const thisMonthTasks = tasks.filter((t) => {
      if (t.status !== "Done" || !t.completed_at) return false;
      return new Date(t.completed_at).getMonth() === thisMonth;
    }).length;

    const lastMonthTasks = tasks.filter((t) => {
      if (t.status !== "Done" || !t.completed_at) return false;
      return new Date(t.completed_at).getMonth() === lastMonth;
    }).length;

    const taskChange = lastMonthTasks > 0
      ? ((thisMonthTasks - lastMonthTasks) / lastMonthTasks * 100).toFixed(0)
      : thisMonthTasks > 0 ? "100" : "0";

    return {
      revenue: { current: currentData.revenue, prev: prevData?.revenue || 0, change: Number(revenueChange) },
      expenses: {
        current: currentData.expenses + currentData.personal,
        prev: (prevData?.expenses || 0) + (prevData?.personal || 0),
        change: Number(expenseChange),
      },
      tasks: { current: thisMonthTasks, prev: lastMonthTasks, change: Number(taskChange) },
    };
  }, [tasks]);

  const items = [
    {
      label: "Revenue",
      current: `₱${comparison.revenue.current.toLocaleString()}`,
      prev: `₱${comparison.revenue.prev.toLocaleString()}`,
      change: comparison.revenue.change,
      upIsGood: true,
    },
    {
      label: "Expenses",
      current: `₱${comparison.expenses.current.toLocaleString()}`,
      prev: `₱${comparison.expenses.prev.toLocaleString()}`,
      change: comparison.expenses.change,
      upIsGood: false,
    },
    {
      label: "Completed",
      current: String(comparison.tasks.current),
      prev: String(comparison.tasks.prev),
      change: comparison.tasks.change,
      upIsGood: true,
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-4 w-4 text-[var(--accent-brand)]" />
        <h3 className="text-sm font-semibold text-foreground">This vs Last Month</h3>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const up = item.change >= 0;
          const good = up === item.upIsGood;
          return (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{item.current}</span>
                <span className={cn(
                  "flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-md",
                  good ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
                )}>
                  {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(item.change)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground">vs previous month</p>
      </div>
    </div>
  );
}
