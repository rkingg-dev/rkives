"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { clientData, websiteData } from "@/lib/mock-data";
import { paymentData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ArrowLeft, Copy, Pencil, Send, Download, MessageCircle, User, Calendar, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";

// Merge payments for lookup
const allPayments = [...paymentData];

const invoiceItems = [
  { description: "Monthly maintenance — Website hosting management, security updates, and content changes", hours: 1, rate: 12000, amount: 12000 },
  { description: "SEO optimization — Blog content, meta tags, and performance improvements", hours: 1, rate: 0, amount: 0 },
  { description: "SSL certificate renewal and DNS management", hours: 1, rate: 0, amount: 0 },
];

const activity = [
  { user: "R King", action: "created the invoice.", time: "Aug 1, 2024", avatar: "" },
  { user: "R King", action: "sent the invoice.", time: "Aug 1, 2024", avatar: "" },
  { user: "Client", action: "viewed the invoice.", time: "Aug 2, 2024", avatar: "" },
  { user: "Client", action: "paid the invoice.", time: "Aug 3, 2024", avatar: "", paid: true },
];

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const payment = allPayments.find((p) => p.id === id);

  if (!payment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground mb-4">Invoice not found.</p>
        <Link href="/dashboard/payments" className="text-sm text-[var(--accent-brand)] hover:underline">Back to payments</Link>
      </div>
    );
  }

  const client = clientData.find((c) => c.id === payment.clientId);
  const site = websiteData.find((w) => w.id === payment.websiteId);

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/payments" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <p className="text-xs text-muted-foreground">Invoice #{payment.referenceNumber}</p>
            <h2 className="text-xl font-bold text-foreground">{client?.name || "Unknown"}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
            <Copy className="h-4 w-4" /> Copy URL
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
            <Pencil className="h-4 w-4" /> Edit
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[var(--accent-brand)] text-white rounded-lg text-sm font-medium hover:bg-[var(--accent-brand)]/90 transition-colors">
            <Send className="h-4 w-4" /> Send
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-card rounded-xl border border-border p-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Invoice</h3>
            <div className="flex items-center gap-8 text-sm">
              <div>
                <span className="text-muted-foreground">Issued on </span>
                <span className="text-foreground font-medium">{payment.paidAt || "Aug 1, 2024"}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Due on </span>
                <span className="text-foreground font-medium">Aug 15, 2024</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">From</p>
              <p className="text-sm font-semibold text-foreground">RKives</p>
              <p className="text-sm text-muted-foreground">rking@rkives.io</p>
              <p className="text-sm text-muted-foreground">Philippines</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">To</p>
              <p className="text-sm font-semibold text-foreground">{client?.name || "Unknown"}</p>
              <p className="text-sm text-muted-foreground">{client?.email || ""}</p>
              <p className="text-sm text-muted-foreground">{client?.company || ""}</p>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="grid grid-cols-12 gap-4 text-xs text-muted-foreground uppercase tracking-wider pb-3 border-b border-border mb-3">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Rate</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            {invoiceItems.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b border-border/50 last:border-0">
                <div className="col-span-6">
                  <p className="text-sm text-foreground">{item.description}</p>
                </div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">{item.hours}</div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">{item.rate > 0 ? `₱${item.rate.toLocaleString()}` : "Included"}</div>
                <div className="col-span-2 text-right text-sm font-medium text-foreground">{item.amount > 0 ? `₱${item.amount.toLocaleString()}` : "—"}</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">₱{payment.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (0%)</span>
                <span className="text-foreground">₱0</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">₱{payment.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Amount Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Amount</span>
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-md", payment.status === "Verified" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10")}>
                {payment.status}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-4">₱{payment.amount.toLocaleString()}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" /> {client?.name}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> {payment.paidAt || "Aug 1, 2024"}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" /> Paid with {payment.method}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <button className="flex items-center gap-1.5 text-sm text-[var(--accent-brand)] hover:underline">
                <Download className="h-4 w-4" /> Download receipt
              </button>
            </div>
          </motion.div>

          {/* Activity */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-5">
            <h4 className="text-sm font-semibold text-foreground mb-4">Activity</h4>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="relative">
                    {a.paid ? (
                      <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <span className="text-xs text-muted-foreground font-medium">{a.user[0]}</span>
                      </div>
                    )}
                    {i < activity.length - 1 && <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-4 bg-border" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{a.user}</span>{" "}
                      <span className="text-muted-foreground">{a.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <input placeholder="Add your comment..." className="flex-1 h-9 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)]" />
                <button className="h-9 px-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Comment</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
