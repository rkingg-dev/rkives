"use client";

import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { motion } from "framer-motion";
import { MoreHorizontal, ExternalLink, FolderOpen, FileText } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import MiniCalendar from "./MiniCalendar";

const maintenanceBarData = [
  { month: "May", value: 4 },
  { month: "Jun", value: 7 },
  { month: "Jul", value: 5 },
  { month: "Aug", value: 6 },
  { month: "Sep", value: 3 },
];

function PortfolioWidget() {
  const { data: websites, loading } = useSupabaseQuery({ table: "websites" });

  const portfolioSites = websites.filter((w) => w.is_portfolio);
  const selectedWorks = portfolioSites.length;
  const topProjects = portfolioSites
    .sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0))
    .slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-xl border border-border shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Portfolio</span>
        </div>
        <button className="p-1 rounded-md hover:bg-muted transition-colors">
          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Selected Works</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{loading ? "--" : selectedWorks}</span>
            <span className="text-xs font-medium text-muted-foreground">projects</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Live</p>
            <p className="text-sm font-semibold text-foreground">{loading ? "--" : websites.filter((w) => w.status === "Live").length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">In Dev</p>
            <p className="text-sm font-semibold text-foreground">{loading ? "--" : websites.filter((w) => w.status === "In Development").length}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Top Projects</p>
        <div className="space-y-2">
          {topProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between py-1.5 group cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground group-hover:text-[var(--accent-brand)] transition-colors">{project.name}</p>
                  <p className="text-[10px] text-muted-foreground">{project.project_type}</p>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
          {!loading && topProjects.length === 0 && (
            <p className="text-xs text-muted-foreground">No portfolio projects yet.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{loading ? "--" : renewalsThisMonth}</span>
          </div>
        </div>

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
            <p className="text-sm font-semibold text-foreground">{loading ? "--" : hostingRenewals}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Domains</p>
            <p className="text-sm font-semibold text-foreground">{loading ? "--" : domainRenewals}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkspaceWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
      <MiniCalendar />
      <PortfolioWidget />
      <MaintenanceWidget />
    </div>
  );
}
