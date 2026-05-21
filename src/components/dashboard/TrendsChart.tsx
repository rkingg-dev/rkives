"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { monthlyRevenue } from "@/lib/finance-data";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-lg p-3 text-xs">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
            {entry.name}: ₱{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrendsChart() {
  const { data: payments } = useSupabaseQuery({ table: "payments" });

  // Use real payments data grouped by month, fall back to finance-data
  const chartData = useMemo(() => {
    if (payments.length === 0) return monthlyRevenue;

    const byMonth = new Map<string, { revenue: number; count: number }>();
    payments.forEach((p) => {
      if (!p.paid_at && !p.created_at) return;
      const date = new Date(p.paid_at || p.created_at);
      const key = date.toLocaleDateString("en-US", { month: "short" });
      const existing = byMonth.get(key) || { revenue: 0, count: 0 };
      byMonth.set(key, {
        revenue: existing.revenue + (p.amount || 0),
        count: existing.count + 1,
      });
    });

    if (byMonth.size === 0) return monthlyRevenue;

    return Array.from(byMonth.entries()).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      profit: Math.round(data.revenue * 0.88),
    }));
  }, [payments]);

  // Calculate trend
  const currentMonth = chartData[chartData.length - 1];
  const prevMonth = chartData.length > 1 ? chartData[chartData.length - 2] : null;
  const trendPct = prevMonth && prevMonth.revenue > 0
    ? (((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100).toFixed(0)
    : "0";
  const trendUp = Number(trendPct) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-xl border border-border shadow-sm"
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-emerald-500" : "text-red-500"}`}>
            <TrendingUp className={`h-3 w-3 ${trendUp ? "" : "rotate-180"}`} />
            {trendPct}%
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Profit
          </span>
        </div>
      </div>

      <div className="px-2 pb-4">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="var(--foreground)" fill="url(#revenueGrad)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#profitGrad)" strokeWidth={2} name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
