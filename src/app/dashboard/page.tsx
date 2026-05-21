"use client";

import KpiTabs from "@/components/dashboard/KpiTabs";
import TrendsChart from "@/components/dashboard/TrendsChart";
import TasksTable from "@/components/dashboard/TasksTable";
import MiniCalendar from "@/components/dashboard/MiniCalendar";
import CashFlowWidget from "@/components/dashboard/CashFlowWidget";
import PendingPayments from "@/components/dashboard/PendingPayments";
import TimeTracker from "@/components/dashboard/TimeTracker";
import ActiveProjects from "@/components/dashboard/ActiveProjects";
import TaskTemplates from "@/components/dashboard/TaskTemplates";
import InvoicePipeline from "@/components/dashboard/InvoicePipeline";
import WebsiteHealth from "@/components/dashboard/WebsiteHealth";
import QuickNotes from "@/components/dashboard/QuickNotes";
import MonthlyComparison from "@/components/dashboard/MonthlyComparison";
import TaskCompletionRate from "@/components/dashboard/TaskCompletionRate";
import DailyFocus from "@/components/dashboard/DailyFocus";
import { CheckSquare, CreditCard } from "lucide-react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";

export default function DashboardPage() {
  const { data: recentTasks } = useSupabaseQuery({ table: "tasks", orderBy: { column: "created_at", ascending: false }, limit: 5 });
  const { data: recentPayments } = useSupabaseQuery({ table: "payments", orderBy: { column: "created_at", ascending: false }, limit: 5 });

  const activity = [
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
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);

  return (
    <div className="flex flex-col xl:flex-row gap-3">
      {/* Main Content */}
      <div className="flex-1 space-y-3 min-w-0">
        <DailyFocus />
        <KpiTabs />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <MonthlyComparison />
          <TaskCompletionRate />
        </div>
        <TrendsChart />
        <TasksTable />
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[280px] shrink-0 space-y-3">
        <MiniCalendar />
        <CashFlowWidget />
        <PendingPayments />
        <TimeTracker />
        <ActiveProjects />
        <TaskTemplates />
        <InvoicePipeline />
        <WebsiteHealth />
        <QuickNotes />
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
      </div>
    </div>
  );
}
