"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { Globe, AlertTriangle, RefreshCw, Clock } from "lucide-react";
import Link from "next/link";

export default function WebsiteHealth() {
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { data: wpUpdates } = useSupabaseQuery({ table: "wp_updates" });
  const { data: changelogs } = useSupabaseQuery({ table: "changelog_entries" });

  const issues = useMemo(() => {
    const now = new Date();
    const thirtyDays = new Date(now);
    thirtyDays.setDate(thirtyDays.getDate() + 30);
    const ninetyDaysAgo = new Date(now);
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const items: { type: string; site: string; detail: string; severity: "warning" | "info" }[] = [];

    // Expiring domains/hosting
    websites.forEach((w) => {
      const domainExpiry = w.domain_expiry ? new Date(w.domain_expiry) : null;
      const hostingExpiry = w.hosting_expiry ? new Date(w.hosting_expiry) : null;

      if (domainExpiry && domainExpiry <= thirtyDays) {
        const days = Math.ceil((domainExpiry.getTime() - now.getTime()) / 86400000);
        items.push({
          type: "domain",
          site: w.name,
          detail: days <= 0 ? "Domain expired" : `Domain expires in ${days}d`,
          severity: days <= 7 ? "warning" : "info",
        });
      }
      if (hostingExpiry && hostingExpiry <= thirtyDays) {
        const days = Math.ceil((hostingExpiry.getTime() - now.getTime()) / 86400000);
        items.push({
          type: "hosting",
          site: w.name,
          detail: days <= 0 ? "Hosting expired" : `Hosting expires in ${days}d`,
          severity: days <= 7 ? "warning" : "info",
        });
      }
    });

    // WordPress updates pending
    const wpPending = wpUpdates.filter((u) => u.status === "Update Available");
    const wpBySite = new Map<string, number>();
    wpPending.forEach((u) => {
      const site = websites.find((w) => w.id === u.website_id);
      if (site) wpBySite.set(site.name, (wpBySite.get(site.name) || 0) + 1);
    });
    wpBySite.forEach((count, siteName) => {
      items.push({
        type: "wp",
        site: siteName,
        detail: `${count} update${count !== 1 ? "s" : ""} pending`,
        severity: "info",
      });
    });

    // Stale changelogs (no entry in 90+ days)
    const sitesWithRecentChangelog = new Set(
      changelogs
        .filter((c) => c.published_at && new Date(c.published_at) >= ninetyDaysAgo)
        .map((c) => c.website_id)
    );
    websites
      .filter((w) => w.status === "Live")
      .forEach((w) => {
        if (!sitesWithRecentChangelog.has(w.id)) {
          items.push({
            type: "stale",
            site: w.name,
            detail: "No updates in 90+ days",
            severity: "info",
          });
        }
      });

    return items;
  }, [websites, wpUpdates, changelogs]);

  if (issues.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 text-[var(--accent-brand)]" />
          Website Health
        </h3>
        <span className="text-xs text-muted-foreground">{issues.length} issue{issues.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="space-y-2">
        {issues.slice(0, 6).map((issue, i) => (
          <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-muted/30">
            {issue.severity === "warning" ? (
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
            ) : issue.type === "wp" ? (
              <RefreshCw className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
            ) : (
              <Clock className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{issue.site}</p>
              <p className={cn("text-[10px]", issue.severity === "warning" ? "text-amber-500" : "text-muted-foreground")}>
                {issue.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {issues.length > 6 && (
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          +{issues.length - 6} more
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-border">
        <Link href="/dashboard/websites" className="text-xs text-[var(--accent-brand)] hover:underline flex items-center gap-1">
          View websites <span className="text-[10px]">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
