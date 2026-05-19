"use client";

import { cn } from "@/lib/utils";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { motion } from "framer-motion";

function KpiSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "px-4 md:px-5 py-3 md:py-4 border-b md:border-b-0 md:border-r border-border last:border-r-0",
            i !== 5 && "border-r"
          )}
        >
          <div className="h-3 w-20 bg-muted rounded animate-pulse mb-2" />
          <div className="h-6 w-14 bg-muted rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default function KpiTabs() {
  const { data: clients, loading: loadingClients } = useSupabaseQuery({ table: "clients" });
  const { data: websites, loading: loadingWebsites } = useSupabaseQuery({ table: "websites" });
  const { data: tasks, loading: loadingTasks } = useSupabaseQuery({ table: "tasks" });
  const { data: payments, loading: loadingPayments } = useSupabaseQuery({ table: "payments" });

  const loading = loadingClients || loadingWebsites || loadingTasks || loadingPayments;

  if (loading) return <KpiSkeleton />;

  const activeClients = clients.length;
  const websiteCount = websites.length;
  const openTasks = tasks.filter((t) => t.status !== "Done").length;
  const monthlyRevenue = payments
    .filter((p) => p.status === "Verified")
    .reduce((sum, p) => sum + p.amount, 0);

  const now = new Date();
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
  const dueThisWeek = tasks.filter((t) => {
    if (!t.due_date) return false;
    const due = new Date(t.due_date);
    return due >= now && due <= endOfWeek && t.status !== "Done";
  }).length;

  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  const maintenanceCount = websites.filter((w) => {
    const domainExpiry = w.domain_expiry ? new Date(w.domain_expiry) : null;
    const hostingExpiry = w.hosting_expiry ? new Date(w.hosting_expiry) : null;
    return (
      (domainExpiry && domainExpiry <= thirtyDaysFromNow) ||
      (hostingExpiry && hostingExpiry <= thirtyDaysFromNow)
    );
  }).length;

  const kpiData = [
    { label: "Active Clients", value: String(activeClients), positive: true },
    { label: "Websites", value: String(websiteCount), positive: true },
    { label: "Open Tasks", value: String(openTasks), positive: false },
    { label: "Monthly Revenue", value: `\u20B1${monthlyRevenue.toLocaleString()}`, positive: true },
    { label: "Due This Week", value: String(dueThisWeek), positive: true },
    { label: "Maintenance", value: String(maintenanceCount), positive: false },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {kpiData.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            "px-4 md:px-5 py-3 md:py-4 border-b md:border-b-0 md:border-r border-border last:border-r-0 cursor-pointer transition-colors hover:bg-muted/30",
            i === 0 && "bg-muted/20"
          )}
        >
          <p className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {kpi.label}
          </p>
          <div className="flex items-baseline gap-1.5 md:gap-2">
            <span className="text-lg md:text-xl font-semibold text-foreground">{kpi.value}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
