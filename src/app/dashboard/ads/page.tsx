"use client";

import { motion } from "framer-motion";
import { DollarSign, MousePointerClick, Eye, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const campaignData = [
  { day: "Mon", spend: 320, conversions: 24, roas: 4.2 },
  { day: "Tue", spend: 280, conversions: 18, roas: 3.8 },
  { day: "Wed", spend: 410, conversions: 32, roas: 5.1 },
  { day: "Thu", spend: 350, conversions: 28, roas: 4.5 },
  { day: "Fri", spend: 390, conversions: 35, roas: 5.4 },
  { day: "Sat", spend: 220, conversions: 15, roas: 3.2 },
  { day: "Sun", spend: 180, conversions: 12, roas: 2.9 },
];

const campaigns = [
  { name: "Branded Sale Campaign", platform: "Google Ads", spend: "$2,450", conversions: 156, roas: "5.2x", status: "Active" },
  { name: "Retargeting - Cart Abandon", platform: "Meta Ads", spend: "$1,200", conversions: 89, roas: "4.1x", status: "Active" },
  { name: "Lookalike Audience - US", platform: "Meta Ads", spend: "$890", conversions: 45, roas: "3.8x", status: "Active" },
  { name: "Search - Brand Terms", platform: "Google Ads", spend: "$650", conversions: 78, roas: "8.2x", status: "Active" },
  { name: "Display - Awareness", platform: "Google Ads", spend: "$420", conversions: 12, roas: "1.9x", status: "Paused" },
];

const kpis = [
  { label: "Total Spend", value: "$4,610", change: "+8%", icon: DollarSign },
  { label: "Conversions", value: "380", change: "+15%", icon: MousePointerClick },
  { label: "Impressions", value: "284K", change: "+22%", icon: Eye },
  { label: "ROAS", value: "4.6x", change: "+0.3", icon: TrendingUp },
];

export default function AdsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Paid Ads Dashboard</h2>

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-border shadow-sm p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Spend & Conversions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="spend" stroke="#111827" fill="#111827" fillOpacity={0.1} />
              <Area type="monotone" dataKey="conversions" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Active Campaigns</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Spend</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Conversions</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">ROAS</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 text-foreground font-medium">{c.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.platform}</td>
                <td className="px-5 py-3 text-foreground">{c.spend}</td>
                <td className="px-5 py-3 text-foreground">{c.conversions}</td>
                <td className="px-5 py-3 text-foreground font-medium">{c.roas}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${c.status === "Active" ? "text-emerald-500 bg-emerald-50" : "text-muted-foreground bg-muted"}`}>
                    {c.status}
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
