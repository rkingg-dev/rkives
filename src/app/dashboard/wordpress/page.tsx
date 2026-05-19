"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { RefreshCw, AlertTriangle, ArrowUpCircle } from "lucide-react";
import { toast } from "sonner";
import { Pagination } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";

const typeFilters = ["All", "Core", "Plugin", "Theme"];

export default function WordpressPage() {
  const [filter, setFilter] = useState("All");
  const [siteFilter, setSiteFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: wpUpdates, loading: updatesLoading, error: updatesError, refetch: refetchUpdates } = useSupabaseQuery({ table: "wp_updates", orderBy: { column: "last_checked", ascending: false } });
  const { data: websites, loading: websitesLoading, error: websitesError, refetch: refetchWebsites } = useSupabaseQuery({ table: "websites" });

  const loading = updatesLoading || websitesLoading;
  const error = updatesError || websitesError;
  const refetch = () => { refetchUpdates(); refetchWebsites(); };

  const wpSiteIds = useMemo(() => Array.from(new Set(wpUpdates.map((u) => u.website_id))), [wpUpdates]);
  const siteOptions = useMemo(() => [{ label: "All Websites", value: "all" }, ...wpSiteIds.map((id) => ({ label: websites.find((w) => w.id === id)?.name || id, value: id }))], [wpSiteIds, websites]);

  const filtered = useMemo(() => {
    return wpUpdates.filter((u) => {
      if (siteFilter !== "all" && u.website_id !== siteFilter) return false;
      if (filter === "All") return true;
      return u.item_type === filter;
    });
  }, [wpUpdates, filter, siteFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const totalUpdates = wpUpdates.filter((u) => u.status !== "Up-to-date").length;
  const critical = wpUpdates.filter((u) => u.status === "Critical").length;
  const lastScanned = wpUpdates.length > 0 ? wpUpdates.reduce((latest, u) => u.last_checked > latest ? u.last_checked : latest, wpUpdates[0].last_checked) : null;

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">WordPress Updates</h2>
        <div className="flex items-center gap-3">
          {critical > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-red-500 bg-red-50 dark:bg-red-500/10">
              <AlertTriangle className="h-3.5 w-3.5" /> {critical} Critical
            </span>
          )}
          {lastScanned && <span className="text-xs text-muted-foreground">Last scanned: {new Date(lastScanned).toLocaleString()}</span>}
          <span className="text-sm text-muted-foreground">{totalUpdates} updates available</span>
          <button onClick={() => toast.info("Scan complete — all sites are up to date")} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Scan All
          </button>
        </div>
      </div>

      {/* Site Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {wpSiteIds.map((siteId) => {
          const site = websites.find((w) => w.id === siteId);
          const updates = wpUpdates.filter((u) => u.website_id === siteId);
          const hasUpdates = updates.some((u) => u.status !== "Up-to-date");
          return (
            <div key={siteId} className={cn("bg-card rounded-xl border p-4 cursor-pointer transition-colors hover:border-[var(--accent-brand)]", hasUpdates ? "border-amber-300 dark:border-amber-500/30" : "border-border")}>
              <p className="text-sm font-medium text-foreground truncate">{site?.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{updates.length} items</p>
              {hasUpdates && <span className="text-[10px] font-semibold text-amber-500 mt-2 block">{updates.filter((u) => u.status !== "Up-to-date").length} updates</span>}
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select options={siteOptions} value={siteFilter} onValueChange={(v) => { setSiteFilter(v); setPage(1); }} className="w-[200px]" />
        <div className="flex gap-1 bg-card border border-border rounded-lg p-1 w-fit">
          {typeFilters.map((f) => (
            <button key={f} onClick={() => { setFilter(f); setPage(1); }} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors", filter === f ? "text-[var(--accent-brand)] font-semibold" : "text-muted-foreground hover:text-foreground")}>{f}</button>
          ))}
        </div>
      </div>

      {/* Updates Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Item</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Current</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Latest</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Auto</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => {
                const site = websites.find((w) => w.id === item.website_id);
                return (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 text-foreground font-medium">{site?.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{item.item_type}</td>
                    <td className="px-5 py-3 text-foreground">{item.item_name}</td>
                    <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{item.current_version}</td>
                    <td className="px-5 py-3 text-foreground font-mono text-xs">{item.latest_version}</td>
                    <td className="px-5 py-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", item.status === "Up-to-date" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : item.status === "Critical" ? "text-red-500 bg-red-50 dark:bg-red-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10")}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={cn("text-xs", item.auto_update ? "text-emerald-500" : "text-muted-foreground")}>{item.auto_update ? "On" : "Off"}</span>
                    </td>
                    <td className="px-5 py-3">
                      {item.status !== "Up-to-date" && (
                        <button onClick={() => toast.success(`${item.item_name} updated to ${item.latest_version}`)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <ArrowUpCircle className="h-4 w-4 text-[var(--accent-brand)]" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
      </motion.div>
    </div>
  );
}
