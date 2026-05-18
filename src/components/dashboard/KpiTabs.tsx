"use client";

import { cn } from "@/lib/utils";
import { kpiData } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function KpiTabs() {
  return (
    <div className="flex gap-0 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {kpiData.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            "flex-1 px-5 py-4 border-r border-border last:border-r-0 cursor-pointer transition-colors hover:bg-muted/30",
            i === 0 && "bg-muted/20"
          )}
        >
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {kpi.label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-foreground">{kpi.value}</span>
            <span
              className={cn(
                "text-xs font-medium",
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
