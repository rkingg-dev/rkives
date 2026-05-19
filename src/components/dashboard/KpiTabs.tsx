"use client";

import { cn } from "@/lib/utils";
import { kpiData } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function KpiTabs() {
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
            <span
              className={cn(
                "text-[10px] md:text-xs font-medium",
                kpi.positive ? "text-emerald-500" : "text-red-500"
              )}
            >
              {kpi.change}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
