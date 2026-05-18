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
            {entry.name}: {entry.value.toLocaleString()}
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
            <h3 className="text-sm font-semibold text-foreground">Trends</h3>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Traffic
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              ROI
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              Conv.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-500 font-medium px-2.5 py-1 rounded-lg bg-emerald-50">
            Traffic: +3.2%
          </span>
          <span className="text-xs text-emerald-500 font-medium px-2.5 py-1 rounded-lg bg-emerald-50">
            ROI: +4.1%
          </span>
          <span className="text-xs text-red-500 font-medium px-2.5 py-1 rounded-lg bg-red-50">
            Conv: -2.7%
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
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f5" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#7b8190" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#7b8190" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="traffic"
                stroke="#fb923c"
                strokeWidth={2}
                dot={false}
                name="Traffic"
              />
              <Line
                type="monotone"
                dataKey="roi"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
                name="ROI"
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#d1d5db"
                strokeWidth={1.5}
                dot={false}
                name="Conv."
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
