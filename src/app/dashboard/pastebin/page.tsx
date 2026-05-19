"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { Plus, Globe, Lock, Copy, ExternalLink, Code, Pencil, Trash2 } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { PastebinForm } from "@/components/forms/PastebinForm";
import { toast } from "sonner";

const langColors: Record<string, string> = {
  sql: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
  typescript: "text-violet-500 bg-violet-50 dark:bg-violet-500/10",
  javascript: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
  css: "text-pink-500 bg-pink-50 dark:bg-pink-500/10",
  html: "text-orange-500 bg-orange-50 dark:bg-orange-500/10",
};

export default function PastebinPage() {
  const [search, setSearch] = useState("");

  const { data: pastes, loading, error, refetch } = useSupabaseQuery({ table: "pastebin_entries", orderBy: { column: "created_at", ascending: false } });
  const { remove } = useSupabaseMutation("pastebin_entries");

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const filtered = useMemo(() => {
    return pastes.filter((p) => {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
    });
  }, [pastes, search]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this paste?")) return;
    const success = await remove(id);
    if (success) { toast.success("Paste deleted"); refetch(); } else { toast.error("Failed to delete paste"); }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Pastebin</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"><Plus className="h-4 w-4" /> New Paste</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>New Paste</ModalTitle>
              <ModalDescription>Create a new code snippet or note.</ModalDescription>
            </ModalHeader>
            <PastebinForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      <div className="relative max-w-md">
        <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search pastes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">No pastes yet</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((paste, i) => (
          <motion.div key={paste.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:border-border/80 transition-colors">
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{paste.title}</h3>
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", langColors[paste.language] || "text-muted-foreground bg-muted")}>{paste.language}</span>
                </div>
                {paste.is_public ? <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
              </div>
              <pre className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground font-mono overflow-x-auto max-h-32 overflow-y-auto">{paste.content}</pre>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-muted-foreground">{paste.created_at}</span>
                <div className="flex items-center gap-2">
                  {paste.share_token && (
                    <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/api/pastebin/${paste.share_token}`); toast.success("Share URL copied"); }} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="h-3 w-3" /> Share
                    </button>
                  )}
                  <button onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("Paste copied"); }} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                  <button onClick={() => { setEditItem(paste); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(paste.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* Edit Modal */}
      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Paste</ModalTitle>
          </ModalHeader>
          {editItem && <PastebinForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>
    </div>
  );
}
