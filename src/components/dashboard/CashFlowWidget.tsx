"use client";

import { monthlyRevenue, expenseBreakdown } from "@/lib/finance-data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import Link from "next/link";

export default function CashFlowWidget() {
  const current = monthlyRevenue[monthlyRevenue.length - 1];
  const totalIncome = current.revenue;
  const totalExpenses = current.expenses + current.personal;
  const remaining = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((current.savings / totalIncome) * 100).toFixed(0) : "0";

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Wallet className="h-4 w-4 text-[var(--accent-brand)]" />
          Cash Flow
        </h3>
        <Link href="/dashboard/finance" className="text-xs text-[var(--accent-brand)] hover:underline">
          Details
        </Link>
      </div>

      <div className="space-y-3">
        {/* Income */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs text-muted-foreground">Income</span>
          </div>
          <span className="text-sm font-semibold text-emerald-500">
            ₱{totalIncome.toLocaleString()}
          </span>
        </div>

        {/* Expenses */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
            <span className="text-xs text-muted-foreground">Expenses</span>
          </div>
          <span className="text-sm font-semibold text-red-500">
            ₱{totalExpenses.toLocaleString()}
          </span>
        </div>

        {/* Expense breakdown */}
        <div className="space-y-1.5 pt-1">
          {expenseBreakdown.slice(0, 3).map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-muted-foreground">{item.category}</span>
                  <span className="text-[10px] font-medium text-foreground">₱{item.amount.toLocaleString()}</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Net */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">Net</span>
          <span className={cn(
            "text-sm font-bold",
            remaining >= 0 ? "text-emerald-500" : "text-red-500"
          )}>
            ₱{remaining.toLocaleString()}
          </span>
        </div>

        {/* Savings rate bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">Savings Rate</span>
            <span className="text-[10px] font-medium text-foreground">{savingsRate}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent-brand)] rounded-full transition-all"
              style={{ width: `${Math.min(Number(savingsRate), 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
