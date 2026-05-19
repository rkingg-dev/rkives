"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Globe, CheckSquare, CreditCard } from "lucide-react";

export default function ClientPortalPage() {
  const params = useParams();
  const clientId = params.id as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/portal/${clientId}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [clientId]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!data) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Access denied</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">{data.client.company || data.client.name}</h1>
        <p className="text-sm text-muted-foreground mb-8">Client Portal</p>

        {/* Websites */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Websites</h2>
          </div>
          {data.websites.length === 0 ? (
            <p className="text-sm text-muted-foreground">No websites.</p>
          ) : (
            <div className="space-y-2">
              {data.websites.map((w: any) => (
                <div key={w.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{w.name}</p>
                    <p className="text-xs text-muted-foreground">{w.platform}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${w.status === "Live" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10"}`}>{w.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Tasks */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Recent Tasks</h2>
          </div>
          {data.tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent tasks.</p>
          ) : (
            <div className="space-y-2">
              {data.tasks.slice(0, 5).map((t: any) => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                  <p className="text-sm text-foreground">{t.title}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${t.status === "Done" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-muted-foreground bg-muted"}`}>{t.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Invoices */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Invoices</h2>
          </div>
          {data.payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No invoices.</p>
          ) : (
            <div className="space-y-2">
              {data.payments.slice(0, 5).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">₱{(p.amount || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{p.billing_period}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${p.status === "Verified" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10"}`}>{p.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
