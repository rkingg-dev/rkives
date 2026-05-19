"use client";

import { useParams } from "next/navigation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { ArrowLeft, Globe, CheckSquare, Shield, ScrollText, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function WebsiteDetailPage() {
  const params = useParams();
  const siteId = params.id as string;

  const { data: websites, loading } = useSupabaseQuery({ table: "websites" });
  const { data: tasks } = useSupabaseQuery({ table: "tasks" });
  const { data: credentials } = useSupabaseQuery({ table: "website_credentials" });
  const { data: changelog } = useSupabaseQuery({ table: "changelog_entries" });
  const { data: wpUpdates } = useSupabaseQuery({ table: "wp_updates" });
  const { data: notes } = useSupabaseQuery({ table: "notes" });

  const site = websites.find((w) => w.id === siteId);

  if (loading) return <PageSkeleton />;
  if (!site) return <ErrorState message="Website not found" />;

  const siteTasks = tasks.filter((t) => t.website_id === siteId);
  const siteCreds = credentials.filter((c) => c.website_id === siteId);
  const siteChangelog = changelog.filter((c) => c.website_id === siteId);
  const siteWp = wpUpdates.filter((w) => w.website_id === siteId);
  const siteNotes = notes.filter((n) => n.website_id === siteId);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Websites", href: "/dashboard/websites" }, { label: site.name }]} />
      <Link href="/dashboard/websites" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to websites
      </Link>

      {/* Website header */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{site.name}</h2>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-brand)] hover:underline">{site.url}</a>
            <div className="flex gap-3 mt-2 text-sm text-muted-foreground">
              <span>{site.platform}</span>
              <span>•</span>
              <span>{site.status}</span>
              {site.monthly_maintenance_fee > 0 && <><span>•</span><span>₱{site.monthly_maintenance_fee.toLocaleString()}/mo</span></>}
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
            site.status === "Live" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" :
            "text-amber-500 bg-amber-50 dark:bg-amber-500/10"
          }`}>{site.status}</span>
        </div>
        {site.description && <p className="mt-3 text-sm text-muted-foreground">{site.description}</p>}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><CheckSquare className="h-4 w-4" /> Tasks</div>
          <div className="text-2xl font-bold text-foreground">{siteTasks.length}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><Shield className="h-4 w-4" /> Credentials</div>
          <div className="text-2xl font-bold text-foreground">{siteCreds.length}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><ScrollText className="h-4 w-4" /> Changelog</div>
          <div className="text-2xl font-bold text-foreground">{siteChangelog.length}</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1"><RefreshCw className="h-4 w-4" /> WP Updates</div>
          <div className="text-2xl font-bold text-foreground">{siteWp.filter((w) => w.status !== "Up-to-date").length}</div>
        </div>
      </div>

      {/* Credentials */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Credentials</h3>
        {siteCreds.length === 0 ? (
          <p className="text-sm text-muted-foreground">No credentials for this website.</p>
        ) : (
          <div className="space-y-2">
            {siteCreds.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div>
                  <span className="text-sm font-medium text-foreground">{c.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">{c.username || c.email}</span>
                </div>
                {c.is_internal && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-muted-foreground bg-muted">Internal</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tasks */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Tasks</h3>
        {siteTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks for this website.</p>
        ) : (
          <div className="space-y-2">
            {siteTasks.slice(0, 10).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <span className="text-sm font-medium text-foreground">{t.title}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  t.status === "Done" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" :
                  t.status === "In Progress" ? "text-blue-500 bg-blue-50 dark:bg-blue-500/10" :
                  "text-muted-foreground bg-muted"
                }`}>{t.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WordPress Updates */}
      {siteWp.length > 0 && (
        <div className="bg-card rounded-xl border border-border shadow-sm p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">WordPress Updates</h3>
          <div className="space-y-2">
            {siteWp.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                <div>
                  <span className="text-sm font-medium text-foreground">{u.item_name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{u.item_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{u.current_version} → {u.latest_version}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    u.status === "Critical" ? "text-red-500 bg-red-50 dark:bg-red-500/10" :
                    u.status === "Update Available" ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" :
                    "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                  }`}>{u.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
