"use client";

import { portfolioData, maintenanceData } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { MoreHorizontal, ExternalLink, FolderOpen, FileText } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

function PortfolioWidget() {
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
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Selected Works</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{portfolioData.selectedWorks}</span>
            <span className="text-xs font-medium text-muted-foreground">projects</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-[11px] text-muted-foreground">Published</p>
            <p className="text-sm font-semibold text-foreground">{portfolioData.publishedCaseStudies}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Drafts</p>
            <p className="text-sm font-semibold text-foreground">{portfolioData.draftCaseStudies}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">Top Projects</p>
        <div className="space-y-2">
          {portfolioData.topProjects.map((project, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 group cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground group-hover:text-[var(--accent-brand)] transition-colors">{project.name}</p>
                  <p className="text-[10px] text-muted-foreground">{project.type}</p>
                </div>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MaintenanceWidget() {
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
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Renewals This Month</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{maintenanceData.renewalsThisMonth}</span>
          </div>
        </div>

        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={maintenanceData.barData} barCategoryGap="30%">
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {maintenanceData.barData.map((_, index) => (
                  <Cell key={index} fill={index === 3 ? "var(--foreground)" : "var(--muted)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-[11px] text-muted-foreground">Hosting</p>
            <p className="text-sm font-semibold text-foreground">{maintenanceData.hostingRenewals}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Domains</p>
            <p className="text-sm font-semibold text-foreground">{maintenanceData.domainRenewals}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkspaceWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
      <PortfolioWidget />
      <MaintenanceWidget />
    </div>
  );
}
