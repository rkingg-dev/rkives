"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { AlertTriangle, Clock, DollarSign, Globe, CheckSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DailyFocus() {
  const { data: tasks } = useSupabaseQuery({ table: "tasks" });
  const { data: payments } = useSupabaseQuery({ table: "payments" });
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const items = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const sevenDays = new Date(now);
    sevenDays.setDate(sevenDays.getDate() + 7);

    const result: { type: string; icon: React.ElementType; color: string; label: string; detail: string; href: string }[] = [];

    // Overdue tasks
    const overdue = tasks.filter((t) => t.status !== "Done" && t.due_date && new Date(t.due_date) < now);
    if (overdue.length > 0) {
      result.push({
        type: "overdue",
        icon: AlertTriangle,
        color: "text-red-500",
        label: `${overdue.length} overdue task${overdue.length > 1 ? "s" : ""}`,
        detail: overdue.slice(0, 2).map((t) => t.title).join(", ") + (overdue.length > 2 ? ` +${overdue.length - 2} more` : ""),
        href: "/dashboard/tasks",
      });
    }

    // Due today
    const dueToday = tasks.filter((t) => {
      if (t.status === "Done" || !t.due_date) return false;
      const due = new Date(t.due_date);
      due.setHours(0, 0, 0, 0);
      return due.getTime() === now.getTime();
    });
    if (dueToday.length > 0) {
      result.push({
        type: "today",
        icon: Clock,
        color: "text-amber-500",
        label: `${dueToday.length} due today`,
        detail: dueToday.slice(0, 2).map((t) => t.title).join(", "),
        href: "/dashboard/tasks",
      });
    }

    // Pending payments
    const pendingPayments = payments.filter((p) => p.status === "Pending");
    if (pendingPayments.length > 0) {
      const total = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
      result.push({
        type: "payment",
        icon: DollarSign,
        color: "text-amber-500",
        label: `${pendingPayments.length} pending payment${pendingPayments.length > 1 ? "s" : ""}`,
        detail: `₱${total.toLocaleString()} total`,
        href: "/dashboard/payments",
      });
    }

    // Expiring domains (7 days)
    const expiring = websites.filter((w) => {
      if (!w.domain_expiry) return false;
      const expiry = new Date(w.domain_expiry);
      return expiry <= sevenDays;
    });
    if (expiring.length > 0) {
      result.push({
        type: "domain",
        icon: Globe,
        color: "text-red-500",
        label: `${expiring.length} domain${expiring.length > 1 ? "s" : ""} expiring soon`,
        detail: expiring.slice(0, 2).map((w) => w.name).join(", "),
        href: "/dashboard/websites",
      });
    }

    // Tasks due this week (not today, not overdue)
    const dueThisWeek = tasks.filter((t) => {
      if (t.status === "Done" || !t.due_date) return false;
      const due = new Date(t.due_date);
      due.setHours(0, 0, 0, 0);
      return due > now && due <= sevenDays;
    });
    if (dueThisWeek.length > 0) {
      result.push({
        type: "week",
        icon: CheckSquare,
        color: "text-blue-500",
        label: `${dueThisWeek.length} due this week`,
        detail: dueThisWeek.slice(0, 2).map((t) => t.title).join(", ") + (dueThisWeek.length > 2 ? ` +${dueThisWeek.length - 2} more` : ""),
        href: "/dashboard/tasks",
      });
    }

    return result;
  }, [tasks, payments, websites]);

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckSquare className="h-4 w-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-foreground">Today</h3>
        </div>
        <p className="text-xs text-emerald-500">All clear — nothing needs attention right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <CheckSquare className="h-4 w-4 text-[var(--accent-brand)]" />
          Today
        </h3>
        <span className="text-[10px] text-muted-foreground">{items.length} item{items.length > 1 ? "s" : ""}</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.href}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", item.color)} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground truncate">{item.detail}</p>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
