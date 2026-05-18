"use client";

import { motion } from "framer-motion";
import { paymentData, clientData, websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Receipt, CheckCircle, Clock, CreditCard } from "lucide-react";

export default function PaymentsPage() {
  const totalReceived = paymentData.filter((p) => p.status === "Verified").reduce((sum, p) => sum + p.amount, 0);
  const pending = paymentData.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Payments</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Record Payment</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2"><CreditCard className="h-4 w-4 text-muted-foreground" /><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Total Received</p></div>
          <p className="text-2xl font-semibold text-foreground">{"\u20B1"}{totalReceived.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2"><Clock className="h-4 w-4 text-muted-foreground" /><p className="text-[11px] text-muted-foreground uppercase tracking-wider">Pending</p></div>
          <p className="text-2xl font-semibold text-foreground">{"\u20B1"}{pending.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2"><Receipt className="h-4 w-4 text-muted-foreground" /><p className="text-[11px] text-muted-foreground uppercase tracking-wider">This Month</p></div>
          <p className="text-2xl font-semibold text-foreground">{paymentData.length} payments</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Method</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Ref #</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Period</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((p) => {
                const client = clientData.find((c) => c.id === p.clientId);
                const site = websiteData.find((w) => w.id === p.websiteId);
                return (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                    <td className="px-5 py-3 font-medium text-foreground">{client?.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{site?.name || "—"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.type}</td>
                    <td className="px-5 py-3 text-foreground font-semibold">{"\u20B1"}{p.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.method}</td>
                    <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{p.referenceNumber}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.billingPeriod}</td>
                    <td className="px-5 py-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit", p.status === "Verified" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10")}>
                        {p.status === "Verified" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{p.paidAt || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
