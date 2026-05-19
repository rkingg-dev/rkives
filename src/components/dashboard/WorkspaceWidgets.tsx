"use client";

import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import MiniCalendar from "./MiniCalendar";

const maintenanceBarData = [
  { month: "May", value: 4 },
  { month: "Jun", value: 7 },
  { month: "Jul", value: 5 },
  { month: "Aug", value: 6 },
  { month: "Sep", value: 3 },
];

function MaintenanceWidget() {
  const { data: websites, loading } = useSupabaseQuery({ table: "websites" });

  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const renewalsThisMonth = websites.filter((w) => {
    const domainExpiry = w.domain_expiry ? new Date(w.domain_expiry) : null;
    const hostingExpiry = w.hosting_expiry ? new Date(w.hosting_expiry) : null;
    return (
      (domainExpiry && domainExpiry <= thirtyDaysFromNow) ||
      (hostingExpiry && hostingExpiry <= thirtyDaysFromNow)
    );
  }).length;

  const hostingRenewals = websites.filter((w) => {
    if (!w.hosting_expiry) return false;
    return new Date(w.hosting_expiry) <= thirtyDaysFromNow;
  }).length;

  const domainRenewals = websites.filter((w) => {
    if (!w.domain_expiry) return false;
    return new Date(w.domain_expiry) <= thirtyDaysFromNow;
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-xl border border-border shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Maintenance</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">MTD</span>
          <button className="p-1 rounded-md hover:bg-muted transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Renewals This Month</p>
          {loading ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">--</span>
            </div>
          ) : renewalsThisMonth === 0 ? (
            <p className="text-sm text-muted-foreground">No renewals upcoming</p>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">{renewalsThisMonth}</span>
            </div>
          )}
        </div>

        {!loading && renewalsThisMonth > 0 && (
          <>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceBarData} barCategoryGap="30%">
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {maintenanceBarData.map((_, index) => (
                      <Cell key={index} fill={index === 3 ? "var(--foreground)" : "var(--muted)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Hosting</p>
                <p className="text-sm font-semibold text-foreground">{hostingRenewals}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Domains</p>
                <p className="text-sm font-semibold text-foreground">{domainRenewals}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function WorkspaceWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
      <MiniCalendar />
      <MaintenanceWidget />
    </div>
  );
}
