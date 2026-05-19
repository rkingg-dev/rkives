"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { Plus, Tag, Calendar, Globe, Pencil, Trash2 } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { ChangelogForm } from "@/components/forms/ChangelogForm";
import { toast } from "sonner";

const typeColors: Record<string, string> = {
  Feature: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
  Fix: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
  Update: "text-violet-500 bg-violet-50 dark:bg-violet-500/10",
  Security: "text-red-500 bg-red-50 dark:bg-red-500/10",
  Maintenance: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
};

export default function ChangelogPage() {
  const [siteFilter, setSiteFilter] = useState("All");

  const { data: changelogEntries, loading: changelogLoading, error: changelogError, refetch: refetchChangelog } = useSupabaseQuery({ table: "changelog_entries", orderBy: { column: "created_at", ascending: false } });
  const { data: websites, loading: websitesLoading, error: websitesError, refetch: refetchWebsites } = useSupabaseQuery({ table: "websites" });
  const { remove } = useSupabaseMutation("changelog_entries");

  const loading = changelogLoading || websitesLoading;
  const error = changelogError || websitesError;
  const refetch = () => { refetchChangelog(); refetchWebsites(); };

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const siteIds = useMemo(() => Array.from(new Set(changelogEntries.map((c) => c.website_id))), [changelogEntries]);

  const filtered = useMemo(() => {
    return changelogEntries.filter((c) => {
      if (siteFilter === "All") return true;
      return c.website_id === siteFilter;
    });
  }, [changelogEntries, siteFilter]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this changelog entry?")) return;
    const success = await remove(id);
    if (success) { toast.success("Entry deleted"); refetch(); } else { toast.error("Failed to delete entry"); }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Changelog</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"><Plus className="h-4 w-4" /> New Entry</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>New Changelog Entry</ModalTitle>
              <ModalDescription>Add a changelog entry for a website.</ModalDescription>
            </ModalHeader>
            <ChangelogForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      {/* Site Filter */}
      <div className="flex gap-1 bg-card border border-border rounded-lg p-1 w-fit overflow-x-auto">
        <button onClick={() => setSiteFilter("All")} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap", siteFilter === "All" ? "text-[var(--accent-brand)] font-semibold" : "text-muted-foreground hover:text-foreground")}>All Sites</button>
        {siteIds.map((siteId) => {
          const site = websites.find((w) => w.id === siteId);
          return (
            <button key={siteId} onClick={() => setSiteFilter(siteId)} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap", siteFilter === siteId ? "text-[var(--accent-brand)] font-semibold" : "text-muted-foreground hover:text-foreground")}>
              {site?.name}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filtered.map((entry, i) => {
          const site = websites.find((w) => w.id === entry.website_id);
          return (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border shadow-sm p-5 relative">
              {entry.version && <span className="absolute top-5 right-5 text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{entry.version}</span>}
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", typeColors[entry.entry_type] || "text-muted-foreground bg-muted")}>{entry.entry_type}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Globe className="h-3 w-3" /> {site?.name}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{entry.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{entry.content}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {entry.published_at || "Draft"}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setEditItem(entry); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Modal */}
      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Changelog Entry</ModalTitle>
          </ModalHeader>
          {editItem && <ChangelogForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>
    </div>
  );
}
