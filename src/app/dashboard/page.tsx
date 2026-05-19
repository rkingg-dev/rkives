"use client";

import { useState, useEffect, useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { CheckSquare, CreditCard, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import KpiTabs from "@/components/dashboard/KpiTabs";
import TrendsChart from "@/components/dashboard/TrendsChart";
import TasksTable from "@/components/dashboard/TasksTable";
import MiniCalendar from "@/components/dashboard/MiniCalendar";
import { MaintenanceWidget } from "@/components/dashboard/WorkspaceWidgets";
import { checkRecurringTasks } from "@/lib/recurring-tasks";

export default function DashboardPage() {
  const { data: recentTasks } = useSupabaseQuery({ table: "tasks", orderBy: { column: "created_at", ascending: false }, limit: 5 });
  const { data: recentPayments } = useSupabaseQuery({ table: "payments", orderBy: { column: "created_at", ascending: false }, limit: 5 });
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recurringSuggestions, setRecurringSuggestions] = useState<{ task: any; reason: string }[]>([]);

  useEffect(() => {
    checkRecurringTasks().then(setRecurringSuggestions).catch(() => {});
  }, []);

  const expiringItems = useMemo(() => {
    const now = new Date();
    const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return websites.filter((w: any) => {
      const domainExpiry = w.domain_expiry ? new Date(w.domain_expiry) : null;
      const hostingExpiry = w.hosting_expiry ? new Date(w.hosting_expiry) : null;
      return (domainExpiry && domainExpiry <= thirtyDays) || (hostingExpiry && hostingExpiry <= thirtyDays);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).map((w: any) => ({
      id: w.id,
      name: w.name,
      domainExpiry: w.domain_expiry,
      hostingExpiry: w.hosting_expiry,
    }));
  }, [websites]);

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
        {expiringItems.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-foreground">Expiring Soon</span>
            </div>
            <div className="space-y-1">
              {expiringItems.map((item) => (
                <p key={item.id} className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{item.name}</span>
                  {item.domainExpiry && new Date(item.domainExpiry) <= new Date(Date.now() + 30 * 86400000) && (
                    <> — Domain expires {new Date(item.domainExpiry).toLocaleDateString()}</>
                  )}
                  {item.hostingExpiry && new Date(item.hostingExpiry) <= new Date(Date.now() + 30 * 86400000) && (
                    <> — Hosting expires {new Date(item.hostingExpiry).toLocaleDateString()}</>
                  )}
                </p>
              ))}
            </div>
          </motion.div>
        )}
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
