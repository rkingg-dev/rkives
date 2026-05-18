"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { trendData } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ChevronDown, MoreHorizontal } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-lg p-3 text-xs">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrendsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl border border-border shadow-sm"
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Workspace Activity</h3>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Tasks Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              New Tasks
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              Updates
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-500 font-medium px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
            Completed: +18%
          </span>
          <span className="text-xs text-orange-500 font-medium px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-500/10">
            New: +8%
          </span>
          <button className="flex items-center gap-1 text-xs text-muted-foreground px-2.5 py-1 rounded-lg hover:bg-muted transition-colors">
            3M <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="tasksCompleted"
                stroke="#34d399"
                strokeWidth={2}
                dot={false}
                name="Tasks Completed"
              />
              <Line
                type="monotone"
                dataKey="newTasks"
                stroke="#fb923c"
                strokeWidth={2}
                dot={false}
                name="New Tasks"
              />
              <Line
                type="monotone"
                dataKey="websiteUpdates"
                stroke="#d1d5db"
                strokeWidth={1.5}
                dot={false}
                name="Updates"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
