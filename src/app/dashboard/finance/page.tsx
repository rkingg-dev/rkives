"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { monthlyRevenue, expenseBreakdown, personalExpenses, recentTransactions, upcomingCosts, savingsGoals } from "@/lib/finance-data";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Shield, Laptop, Plane, PiggyBank } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Pagination } from "@/components/ui/pagination";

const COLORS = ["#111827", "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb"];
const goalIcons: Record<string, React.ElementType> = { shield: Shield, laptop: Laptop, plane: Plane };

export default function FinancePage() {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"all" | "business" | "personal">("all");
  const pageSize = 8;

  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { data: clients } = useSupabaseQuery({ table: "clients" });

  const computedMRR = useMemo(() => {
    return clients.map((c: any) => {
      const clientWebsites = websites.filter((w: any) => w.client_id === c.id);
      const monthly = clientWebsites.reduce((sum: number, w: any) => sum + (w.monthly_maintenance_fee || 0), 0);
      return { client: c.company || c.name, monthly, websites: clientWebsites.length };
    }).filter((c: any) => c.monthly > 0).sort((a: any, b: any) => b.monthly - a.monthly);
  }, [clients, websites]);

  const filtered = recentTransactions.filter((t) => {
    if (tab === "all") return true;
    if (tab === "business") return t.category === "Business";
    return t.category === "Personal";
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const prevMonth = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueChange = ((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1);
  const profitChange = ((currentMonth.profit - prevMonth.profit) / prevMonth.profit * 100).toFixed(1);
  const profitMargin = ((currentMonth.profit / currentMonth.revenue) * 100).toFixed(0);
  const savingsRate = ((currentMonth.savings / currentMonth.revenue) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Finance</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5"><Wallet className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground uppercase tracking-wider">Revenue</span></div>
          <p className="text-xl font-semibold text-foreground">{"\u20B1"}{currentMonth.revenue.toLocaleString()}</p>
          <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-500 mt-1"><ArrowUpRight className="h-3 w-3" />{revenueChange}%</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5"><ArrowDownRight className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground uppercase tracking-wider">Expenses</span></div>
          <p className="text-xl font-semibold text-foreground">{"\u20B1"}{(currentMonth.expenses + currentMonth.personal).toLocaleString()}</p>
          <span className="text-xs text-muted-foreground mt-1 block">Biz {"\u20B1"}{currentMonth.expenses.toLocaleString()} + Personal {"\u20B1"}{currentMonth.personal.toLocaleString()}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5"><TrendingUp className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground uppercase tracking-wider">Net Profit</span></div>
          <p className="text-xl font-semibold text-foreground">{"\u20B1"}{currentMonth.profit.toLocaleString()}</p>
          <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-500 mt-1"><ArrowUpRight className="h-3 w-3" />{profitChange}%</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5"><PiggyBank className="h-4 w-4 text-muted-foreground" /><span className="text-xs text-muted-foreground uppercase tracking-wider">Savings</span></div>
          <p className="text-xl font-semibold text-foreground">{"\u20B1"}{currentMonth.savings.toLocaleString()}</p>
          <span className="text-xs text-emerald-500 font-medium mt-1 block">{savingsRate}% savings rate</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1.5"><span className="text-xs text-muted-foreground uppercase tracking-wider">Margin</span></div>
          <p className="text-xl font-semibold text-foreground">{profitMargin}%</p>
          <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${profitMargin}%` }} />
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Income vs Expenses</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="revenue" stroke="#111827" fill="#111827" fillOpacity={0.05} strokeWidth={2} name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="#22c55e" fillOpacity={0.05} strokeWidth={2} name="Profit" />
                <Area type="monotone" dataKey="personal" stroke="#f97316" fill="#f97316" fillOpacity={0.05} strokeWidth={1.5} name="Personal" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-foreground" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Profit</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--accent-brand)]" /> Personal</span>
          </div>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Business Expenses</h3>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseBreakdown} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={14}>
                  {expenseBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {expenseBreakdown.map((e) => (
              <div key={e.category} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{e.category}</span>
                <span className="text-foreground font-medium">{"\u20B1"}{e.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
            <div className="flex gap-1 bg-muted/50 border border-border rounded-lg p-0.5">
              {(["all", "business", "personal"] as const).map((t) => (
                <button key={t} onClick={() => { setTab(t); setPage(1); }} className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize", tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{t}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
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
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-md", t.type === "Income" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : t.type === "Transfer" ? "text-blue-500 bg-blue-50 dark:bg-blue-500/10" : "text-red-500 bg-red-50 dark:bg-red-500/10")}>
                        {t.type}
                      </span>
                    </td>
                    <td className={cn("px-5 py-2.5 text-right font-medium", t.amount > 0 ? "text-foreground" : "text-red-500")}>
                      {t.amount > 0 ? "+" : "-"}{"\u20B1"}{Math.abs(t.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} onPageSizeChange={() => {}} />
        </motion.div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Savings Goals */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Savings Goals</h3>
            <div className="space-y-4">
              {savingsGoals.map((g) => {
                const Icon = goalIcons[g.icon] || Shield;
                const progress = (g.current / g.target * 100).toFixed(0);
                return (
                  <div key={g.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{g.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent-brand)] rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{"\u20B1"}{g.current.toLocaleString()}</span>
                      <span>{"\u20B1"}{g.target.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Client MRR */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Client MRR</h3>
            <div className="space-y-2 max-h-[240px] overflow-y-auto scrollbar-hide">
              {computedMRR.map((c: any) => (
                <div key={c.client} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-foreground">{c.client}</span>
                    <span className="text-xs text-muted-foreground ml-1">{c.websites} sites</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{"\u20B1"}{c.monthly.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
