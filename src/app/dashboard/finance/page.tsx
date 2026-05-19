"use client";

import { motion } from "framer-motion";
import { monthlyRevenue, expenseBreakdown, recentTransactions, upcomingCosts, clientMRR } from "@/lib/finance-data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Calendar, AlertTriangle } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";

const COLORS = ["#111827", "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb"];

export default function FinancePage() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(recentTransactions.length / pageSize);
  const paginated = recentTransactions.slice((page - 1) * pageSize, page * pageSize);

  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const prevMonth = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueChange = ((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1);
  const profitChange = ((currentMonth.profit - prevMonth.profit) / prevMonth.profit * 100).toFixed(1);
  const profitMargin = ((currentMonth.profit / currentMonth.revenue) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Finance</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Revenue</span></div>
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-500"><ArrowUpRight className="h-3 w-3" />{revenueChange}%</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{"\u20B1"}{currentMonth.revenue.toLocaleString()}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2"><ArrowDownRight className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground uppercase tracking-wider">Expenses</span></div>
            <span className="text-xs text-muted-foreground">This month</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{"\u20B1"}{currentMonth.expenses.toLocaleString()}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground uppercase tracking-wider">Net Profit</span></div>
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-500"><ArrowUpRight className="h-3 w-3" />{profitChange}%</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{"\u20B1"}{currentMonth.profit.toLocaleString()}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Profit Margin</span>
            <span className="text-xs text-emerald-500 font-medium">{profitMargin}%</span>
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${profitMargin}%` }} />
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Trend</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="revenue" stroke="#111827" fill="#111827" fillOpacity={0.05} strokeWidth={2} />
                <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="#22c55e" fillOpacity={0.05} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-foreground" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Profit</span>
          </div>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Expense Breakdown</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseBreakdown} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={16}>
                  {expenseBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {expenseBreakdown.map((e) => (
              <div key={e.category} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{e.category}</span>
                <span className="text-foreground font-medium">{"\u20B1"}{e.amount.toLocaleString()} <span className="text-muted-foreground">({e.percent}%)</span></span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-2.5 text-muted-foreground">{t.date}</td>
                    <td className="px-5 py-2.5">
                      <div className="text-foreground font-medium">{t.client}</div>
                      <div className="text-xs text-muted-foreground">{t.description}</div>
                    </td>
                    <td className="px-5 py-2.5">
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-md", t.type === "Income" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-red-500 bg-red-50 dark:bg-red-500/10")}>
                        {t.type}
                      </span>
                    </td>
                    <td className={cn("px-5 py-2.5 text-right font-medium", t.amount > 0 ? "text-foreground" : "text-red-500")}>
                      {t.amount > 0 ? "+" : ""}{"\u20B1"}{Math.abs(t.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={recentTransactions.length} pageSize={pageSize} onPageSizeChange={() => {}} />
        </motion.div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Client MRR */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Client MRR</h3>
            <div className="space-y-2.5">
              {clientMRR.map((c) => (
                <div key={c.client} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-foreground">{c.client}</span>
                    <span className="text-xs text-muted-foreground ml-1.5">{c.websites} sites</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{"\u20B1"}{c.monthly.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Costs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Upcoming Costs</h3>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <div className="space-y-2.5">
              {upcomingCosts.map((c, i) => {
                const daysUntil = Math.ceil((new Date(c.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-foreground">{c.item}</span>
                      <span className={cn("text-xs ml-1.5", daysUntil < 90 ? "text-amber-500" : "text-muted-foreground")}>{c.dueDate}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{"\u20B1"}{c.amount.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
