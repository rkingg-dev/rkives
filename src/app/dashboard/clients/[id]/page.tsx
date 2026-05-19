"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { ArrowLeft, Globe, CheckSquare, CreditCard, Shield } from "lucide-react";
import Link from "next/link";

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;

  const { data: clients, loading: clientsLoading } = useSupabaseQuery({ table: "clients" });
  const { data: websites } = useSupabaseQuery({ table: "websites", filters: { client_id: clientId } });
  const { data: tasks } = useSupabaseQuery({ table: "tasks" });
  const { data: payments } = useSupabaseQuery({ table: "payments", filters: { client_id: clientId } });
  const { data: credentials } = useSupabaseQuery({ table: "website_credentials" });

  const client = clients.find((c) => c.id === clientId);

  if (clientsLoading) return <PageSkeleton />;
  if (!client) return <ErrorState message="Client not found" />;

  // Filter tasks to only those on this client's websites
  const websiteIds = websites.map((w) => w.id);
  const clientTasks = tasks.filter((t) => t.website_id && websiteIds.includes(t.website_id));
  const totalMonthly = websites.reduce((sum, w) => sum + (w.monthly_maintenance_fee || 0), 0);
  const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/dashboard/clients" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to clients
      </Link>

      {/* Client header */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <h2 className="text-2xl font-bold text-foreground">{client.name}</h2>
        <p className="text-muted-foreground">{client.company}</p>
        <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
          <span>{client.email}</span>
          <span>{client.phone}</span>
        </div>
        {client.notes && <p className="mt-3 text-sm text-muted-foreground">{client.notes}</p>}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><Globe className="h-4 w-4" /> Websites</div>
          <div className="text-2xl font-bold text-foreground">{websites.length}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><CheckSquare className="h-4 w-4" /> Tasks</div>
          <div className="text-2xl font-bold text-foreground">{clientTasks.length}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><CreditCard className="h-4 w-4" /> Total Paid</div>
          <div className="text-2xl font-bold text-foreground">₱{totalPaid.toLocaleString()}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><Shield className="h-4 w-4" /> Monthly</div>
          <div className="text-2xl font-bold text-foreground">₱{totalMonthly.toLocaleString()}/mo</div>
        </div>
      </div>

      {/* Websites list */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Websites</h3>
        {websites.length === 0 ? (
          <p className="text-sm text-muted-foreground">No websites for this client.</p>
        ) : (
          <div className="space-y-2">
            {websites.map((w) => (
              <Link key={w.id} href={`/dashboard/websites/${w.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div>
                  <span className="text-sm font-medium text-foreground">{w.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{w.platform}</span>
                </div>
                <span className="text-xs text-muted-foreground">₱{(w.monthly_maintenance_fee || 0).toLocaleString()}/mo</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent tasks */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Tasks</h3>
        {clientTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks for this client.</p>
        ) : (
          <div className="space-y-2">
            {clientTasks.slice(0, 10).map((t) => {
              const site = websites.find((w) => w.id === t.website_id);
              return (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                  <div>
                    <span className="text-sm font-medium text-foreground">{t.title}</span>
                    {site && <span className="text-xs text-muted-foreground ml-2">{site.name}</span>}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    t.status === "Done" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" :
                    t.status === "In Progress" ? "text-blue-500 bg-blue-50 dark:bg-blue-500/10" :
                    "text-muted-foreground bg-muted"
                  }`}>{t.status}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent payments */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Payment History</h3>
        {payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payments from this client.</p>
        ) : (
          <div className="space-y-2">
            {payments.slice(0, 10).map((p) => (
              <Link key={p.id} href={`/dashboard/invoice?id=${p.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div>
                  <span className="text-sm font-medium text-foreground">₱{p.amount?.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-2">{p.payment_type} — {p.billing_period}</span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  p.status === "Verified" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" :
                  p.status === "Pending" ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" :
                  "text-muted-foreground bg-muted"
                }`}>{p.status}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
