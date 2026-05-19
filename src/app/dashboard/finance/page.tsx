"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { monthlyRevenue, expenseBreakdown, personalExpenses, savingsGoals } from "@/lib/finance-data";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Wallet, TrendingUp, ArrowDownRight, PiggyBank, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Pagination } from "@/components/ui/pagination";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalClose } from "@/components/ui/modal";

const goalIcons: Record<string, React.ElementType> = { shield: Wallet, laptop: TrendingUp, plane: PiggyBank };

// Budget categories with monthly limits
const budgetCategories = [
  { name: "Hosting", limit: 5000, color: "bg-foreground" },
  { name: "Domains", limit: 2000, color: "bg-gray-500" },
  { name: "Tools & Software", limit: 3000, color: "bg-gray-400" },
  { name: "Fonts & Assets", limit: 1500, color: "bg-gray-300" },
  { name: "Other Business", limit: 1000, color: "bg-gray-200" },
];

const personalBudget = [
  { name: "Rent", limit: 12000, color: "bg-foreground" },
  { name: "Food & Dining", limit: 6000, color: "bg-gray-500" },
  { name: "Transport", limit: 3000, color: "bg-gray-400" },
  { name: "Utilities", limit: 2500, color: "bg-gray-300" },
  { name: "Shopping", limit: 2000, color: "bg-gray-200" },
  { name: "Other Personal", limit: 1500, color: "bg-gray-100" },
];

export default function FinancePage() {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"all" | "business" | "personal">("all");
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ description: "", amount: "", category: "Other Business", type: "business" as "business" | "personal" });
  const pageSize = 10;

  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { data: clients } = useSupabaseQuery({ table: "clients" });
  const { data: payments } = useSupabaseQuery({ table: "payments", orderBy: { column: "created_at", ascending: false } });

  // Compute total monthly income from payments
  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const totalIncome = currentMonth.revenue;
  const totalExpenses = currentMonth.expenses + currentMonth.personal;
  const remaining = totalIncome - totalExpenses;
  const savingsRate = ((currentMonth.savings / totalIncome) * 100).toFixed(0);

  // Map expense breakdown to budget categories
  const spentByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    expenseBreakdown.forEach((e) => { map[e.category] = e.amount; });
    personalExpenses.forEach((e) => { map[e.category] = e.amount; });
    return map;
  }, []);

  // Transactions from payments
  const transactions = useMemo(() => {
    return payments.map((p) => ({
      id: p.id,
      date: p.paid_at || p.created_at,
      client: clients.find((c) => c.id === p.client_id)?.company || "Unknown",
      type: "income" as const,
      category: "Business",
      description: p.payment_type,
      amount: p.amount || 0,
      method: p.method,
      status: p.status,
    }));
  }, [payments, clients]);

  const filtered = transactions.filter((t) => {
    if (tab === "all") return true;
    if (tab === "business") return t.category === "Business";
    return t.category === "Personal";
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Budget Tracker</h2>
        <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Income</p>
          <p className="text-2xl font-bold text-foreground">₱{totalIncome.toLocaleString()}</p>
          <p className="text-xs text-emerald-500 mt-1">This month</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Spent</p>
          <p className="text-2xl font-bold text-foreground">₱{totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Business + Personal</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cn("rounded-xl border p-5", remaining >= 0 ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20")}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Remaining</p>
          <p className={cn("text-2xl font-bold", remaining >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>₱{remaining.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{savingsRate}% savings rate</p>
        </motion.div>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Business Budget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Business Budget</h3>
            <span className="text-xs text-muted-foreground">₱{expenseBreakdown.reduce((s, e) => s + e.amount, 0).toLocaleString()} / ₱{budgetCategories.reduce((s, c) => s + c.limit, 0).toLocaleString()}</span>
          </div>
          <div className="space-y-4">
            {budgetCategories.map((cat) => {
              const spent = spentByCategory[cat.name] || 0;
              const pct = Math.min((spent / cat.limit) * 100, 100);
              const over = spent > cat.limit;
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{cat.name}</span>
                    <span className={cn("text-xs font-medium", over ? "text-red-500" : "text-muted-foreground")}>₱{spent.toLocaleString()} / ₱{cat.limit.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", over ? "bg-red-500" : cat.color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Personal Budget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Personal Budget</h3>
            <span className="text-xs text-muted-foreground">₱{personalExpenses.reduce((s, e) => s + e.amount, 0).toLocaleString()} / ₱{personalBudget.reduce((s, c) => s + c.limit, 0).toLocaleString()}</span>
          </div>
          <div className="space-y-4">
            {personalBudget.map((cat) => {
              const spent = spentByCategory[cat.name] || 0;
              const pct = Math.min((spent / cat.limit) * 100, 100);
              const over = spent > cat.limit;
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{cat.name}</span>
                    <span className={cn("text-xs font-medium", over ? "text-red-500" : "text-muted-foreground")}>₱{spent.toLocaleString()} / ₱{cat.limit.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", over ? "bg-red-500" : cat.color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="w-full max-w-[75%]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-5">
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
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
              <Modal open={expenseModalOpen} onOpenChange={setExpenseModalOpen}>
                <ModalTrigger asChild>
                  <button onClick={() => setExpenseModalOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <Plus className="h-3 w-3" /> Add Expense
                  </button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Add Expense</ModalTitle>
                    <ModalDescription>Record a new expense.</ModalDescription>
                  </ModalHeader>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!expenseForm.description || !expenseForm.amount) {
                      toast.error("Fill in all fields");
                      return;
                    }
                    // Store as a local transaction (in a real app this would save to DB)
                    toast.success(`Expense added: ₱${Number(expenseForm.amount).toLocaleString()}`);
                    setExpenseForm({ description: "", amount: "", category: "Other Business", type: "business" });
                    setExpenseModalOpen(false);
                  }} className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Description</label>
                      <input
                        type="text"
                        value={expenseForm.description}
                        onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                        placeholder="e.g., Hosting renewal"
                        className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Amount (₱)</label>
                      <input
                        type="number"
                        value={expenseForm.amount}
                        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                        placeholder="0"
                        className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Category</label>
                      <select
                        value={expenseForm.category}
                        onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                        className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        {expenseForm.type === "business" ? (
                          <>
                            <option value="Hosting">Hosting</option>
                            <option value="Domains">Domains</option>
                            <option value="Tools & Software">Tools & Software</option>
                            <option value="Fonts & Assets">Fonts & Assets</option>
                            <option value="Other Business">Other Business</option>
                          </>
                        ) : (
                          <>
                            <option value="Rent">Rent</option>
                            <option value="Food & Dining">Food & Dining</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Other Personal">Other Personal</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Type</label>
                      <div className="flex gap-2 mt-1">
                        <button type="button" onClick={() => setExpenseForm({ ...expenseForm, type: "business", category: "Other Business" })} className={cn("px-4 py-2 text-sm rounded-lg border transition-colors", expenseForm.type === "business" ? "border-foreground bg-muted text-foreground" : "border-border text-muted-foreground hover:text-foreground")}>Business</button>
                        <button type="button" onClick={() => setExpenseForm({ ...expenseForm, type: "personal", category: "Other Personal" })} className={cn("px-4 py-2 text-sm rounded-lg border transition-colors", expenseForm.type === "personal" ? "border-foreground bg-muted text-foreground" : "border-border text-muted-foreground hover:text-foreground")}>Personal</button>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={() => setExpenseModalOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Expense</button>
                    </div>
                  </form>
                </ModalContent>
              </Modal>
            </div>
            <div className="flex gap-1 bg-muted/50 border border-border rounded-lg p-0.5">
              {(["all", "business", "personal"] as const).map((t) => (
                <button key={t} onClick={() => { setTab(t); setPage(1); }} className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize", tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{t}</button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">No transactions yet</p>
            </div>
          ) : (
          <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                  <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</th>
                  <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => (
                  <tr key={t.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-2.5 text-muted-foreground">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-5 py-2.5">
                      <div className="text-foreground font-medium">{t.client}</div>
                      <div className="text-xs text-muted-foreground">{t.description}</div>
                    </td>
                    <td className="px-5 py-2.5 text-muted-foreground text-xs">{t.method}</td>
                    <td className="px-5 py-2.5 text-right font-medium text-emerald-600 dark:text-emerald-400">
                      +₱{t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} onPageSizeChange={() => {}} />
          </>
          )}
        </motion.div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Savings Goals */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Savings Goals</h3>
            <div className="space-y-4">
              {savingsGoals.map((g) => {
                const Icon = goalIcons[g.icon] || Wallet;
                const progress = Math.min((g.current / g.target * 100), 100).toFixed(0);
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
                      <span>₱{g.current.toLocaleString()}</span>
                      <span>₱{g.target.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Client MRR */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Monthly Recurring</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-hide">
              {clients
                .map((c) => {
                  const clientWebsites = websites.filter((w) => w.client_id === c.id);
                  const monthly = clientWebsites.reduce((sum, w) => sum + (w.monthly_maintenance_fee || 0), 0);
                  return { name: c.company || c.name, monthly, sites: clientWebsites.length };
                })
                .filter((c) => c.monthly > 0)
                .sort((a, b) => b.monthly - a.monthly)
                .map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-1">
                    <div>
                      <span className="text-sm text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">{c.sites} sites</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">₱{c.monthly.toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
