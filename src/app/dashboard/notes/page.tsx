"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Search, Lock, Globe, Plus, Tag, Pencil, Trash2, Share2 } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { NoteForm } from "@/components/forms/NoteForm";
import { toast } from "sonner";

export default function NotesPage() {
  const [search, setSearch] = useState("");

  const { data: notes, loading: notesLoading, error: notesError, refetch: refetchNotes } = useSupabaseQuery({ table: "notes", orderBy: { column: "created_at", ascending: false } });
  const { data: websites, loading: websitesLoading, error: websitesError, refetch: refetchWebsites } = useSupabaseQuery({ table: "websites" });
  const { remove } = useSupabaseMutation("notes");

  const loading = notesLoading || websitesLoading;
  const error = notesError || websitesError;
  const refetch = () => { refetchNotes(); refetchWebsites(); };

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const q = search.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q));
    });
  }, [notes, search]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this note?")) return;
    const success = await remove(id);
    if (success) { toast.success("Note deleted"); refetch(); } else { toast.error("Failed to delete note"); }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Notes</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"><Plus className="h-4 w-4" /> New Note</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>New Note</ModalTitle>
              <ModalDescription>Create a new note or blog post.</ModalDescription>
            </ModalHeader>
            <NoteForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">No notes yet</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note, i) => {
          const site = websites.find((w) => w.id === note.website_id);
          return (
            <motion.div key={note.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border shadow-sm p-5 hover:border-border/80 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight">{note.title}</h3>
                <div className="flex items-center gap-1 shrink-0">
                  {note.is_public ? <Globe className="h-3.5 w-3.5 text-muted-foreground" /> : <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-3">{note.content}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {note.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                    <Tag className="h-2.5 w-2.5" /> {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{site?.name || "General"}</span>
                <span>{note.created_at}</span>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                <button onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/notes/${note.slug}`);
                  toast.success("Note URL copied");
                }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button onClick={() => { setEditItem(note); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button onClick={() => handleDelete(note.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      )}

      {/* Edit Modal */}
      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Note</ModalTitle>
          </ModalHeader>
          {editItem && <NoteForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>
    </div>
  );
}
