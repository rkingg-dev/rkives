"use client";

import { useState, useEffect } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { CheckSquare, CreditCard } from "lucide-react";
import KpiTabs from "@/components/dashboard/KpiTabs";
import TrendsChart from "@/components/dashboard/TrendsChart";
import TasksTable from "@/components/dashboard/TasksTable";
import MiniCalendar from "@/components/dashboard/MiniCalendar";
import { MaintenanceWidget } from "@/components/dashboard/WorkspaceWidgets";
import { checkRecurringTasks } from "@/lib/recurring-tasks";

export default function DashboardPage() {
  const { data: recentTasks } = useSupabaseQuery({ table: "tasks", orderBy: { column: "created_at", ascending: false }, limit: 5 });
  const { data: recentPayments } = useSupabaseQuery({ table: "payments", orderBy: { column: "created_at", ascending: false }, limit: 5 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recurringSuggestions, setRecurringSuggestions] = useState<{ task: any; reason: string }[]>([]);

  useEffect(() => {
    checkRecurringTasks().then(setRecurringSuggestions).catch(() => {});
  }, []);

  const activity = [
    ...recentTasks.map((t: any) => ({
      id: t.id,
      type: "task",
      icon: CheckSquare,
      color: "text-blue-500",
      title: t.title,
      desc: `${t.status} · ${t.priority}`,
      time: t.created_at,
    })),
    ...recentPayments.map((p: any) => ({
      id: p.id,
      type: "payment",
      icon: CreditCard,
      color: "text-emerald-500",
      title: `₱${p.amount?.toLocaleString()} payment`,
      desc: p.status,
      time: p.created_at,
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);

  return (
    <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-4 min-w-0">
        <KpiTabs />
        <TrendsChart />
        <TasksTable />
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[280px] shrink-0 space-y-4">
        <MiniCalendar />
        {recurringSuggestions.length > 0 && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Recurring Tasks</h3>
            <div className="space-y-2">
              {recurringSuggestions.map((s) => (
                <div key={s.task.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm text-foreground">{s.task.title}</p>
                    <p className="text-xs text-muted-foreground">{s.reason}</p>
                  </div>
                  <button
                    onClick={() => {
                      toast.info("Create new task from: " + s.task.title);
                    }}
                    className="text-xs text-[var(--accent-brand)] hover:underline"
                  >
                    Create
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-card rounded-xl border border-border shadow-sm p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
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
        <MaintenanceWidget />
      </div>
    </div>
  );
}
