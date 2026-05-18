"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, Link as LinkIcon, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const keywordData = [
  { keyword: "analytics dashboard", position: 3, volume: "12.1K", change: "+2" },
  { keyword: "saas metrics", position: 5, volume: "8.4K", change: "+1" },
  { keyword: "realtime analytics", position: 7, volume: "6.2K", change: "-1" },
  { keyword: "business intelligence", position: 12, volume: "15.3K", change: "+3" },
  { keyword: "data visualization", position: 15, volume: "9.8K", change: "0" },
];

const trafficData = [
  { day: "Mon", organic: 4200, direct: 2100, referral: 800 },
  { day: "Tue", organic: 3800, direct: 2400, referral: 950 },
  { day: "Wed", organic: 5100, direct: 2200, referral: 1100 },
  { day: "Thu", organic: 4600, direct: 2800, referral: 750 },
  { day: "Fri", organic: 5400, direct: 2500, referral: 1200 },
  { day: "Sat", organic: 3200, direct: 1800, referral: 600 },
  { day: "Sun", organic: 2900, direct: 1600, referral: 500 },
];

const kpis = [
  { label: "Organic Traffic", value: "29.2K", change: "+12%", icon: TrendingUp },
  { label: "Keywords Ranked", value: "847", change: "+23", icon: Search },
  { label: "Backlinks", value: "1,234", change: "+45", icon: LinkIcon },
  { label: "Domain Rating", value: "67", change: "+2", icon: Globe },
];

export default function SeoPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">SEO Dashboard</h2>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-border p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">{kpi.value}</span>
              <span className="text-xs font-medium text-emerald-500">{kpi.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Traffic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-border shadow-sm p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Sources</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="organic" fill="#111827" radius={[4, 4, 0, 0]} />
              <Bar dataKey="direct" fill="#9ca3af" radius={[4, 4, 0, 0]} />
              <Bar dataKey="referral" fill="#d1d5db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Keywords Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Top Keywords</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Keyword</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Position</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Volume</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody>
            {keywordData.map((kw, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 text-foreground font-medium">{kw.keyword}</td>
                <td className="px-5 py-3 text-foreground">#{kw.position}</td>
                <td className="px-5 py-3 text-muted-foreground">{kw.volume}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium ${kw.change.startsWith("+") ? "text-emerald-500" : kw.change === "0" ? "text-muted-foreground" : "text-red-500"}`}>
                    {kw.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
