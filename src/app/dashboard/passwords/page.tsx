"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, ExternalLink, Shield, Key, Copy, Lock, Pencil, Trash2 } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";
import { CredentialForm } from "@/components/forms/CredentialForm";
import { toast } from "sonner";

export default function PasswordsPage() {
  const { data: credentials, loading, error, refetch } = useSupabaseQuery({ table: "website_credentials", orderBy: { column: "created_at", ascending: false } });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { remove } = useSupabaseMutation("website_credentials");

  const [visible, setVisible] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const filtered = useMemo(() => {
    return credentials.filter((c) => {
      const site = websites.find((w) => w.id === c.website_id);
      const q = search.toLowerCase();
      return site?.name.toLowerCase().includes(q) || c.label.toLowerCase().includes(q) || c.username.toLowerCase().includes(q);
    });
  }, [credentials, websites, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this credential?")) return;
    const success = await remove(id);
    if (success) { toast.success("Credential deleted"); refetch(); } else { toast.error("Failed to delete credential"); }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">Passwords</h2>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md text-amber-500 bg-amber-50 dark:bg-amber-500/10">
            <Lock className="h-3 w-3" /> Encrypted
          </span>
        </div>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Credential</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add Credential</ModalTitle>
              <ModalDescription>Store a new login credential.</ModalDescription>
            </ModalHeader>
            <CredentialForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      <div className="relative max-w-md">
        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search passwords..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Label</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">URL</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Username</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">2FA</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Access</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((cred) => {
                const site = websites.find((w) => w.id === cred.website_id);
                return (
                  <tr key={cred.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{site?.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{cred.label}</td>
                    <td className="px-5 py-3">
                      <a href={cred.url} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-brand)] hover:underline flex items-center gap-1 text-xs">
                        Open <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="px-5 py-3 text-foreground font-mono text-xs">{cred.username}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{visible === cred.id ? cred.password_value : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}</span>
                        <button onClick={() => setVisible(visible === cred.id ? null : cred.id)} className="p-1 rounded-md hover:bg-muted transition-colors">
                          {visible === cred.id ? <EyeOff className="h-3 w-3 text-muted-foreground" /> : <Eye className="h-3 w-3 text-muted-foreground" />}
                        </button>
                        <button className="p-1 rounded-md hover:bg-muted transition-colors">
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {cred.totp_secret ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10">Enabled</span> : <span className="text-[10px] text-muted-foreground">{"\u2014"}</span>}
                    </td>
                    <td className="px-5 py-3">
                      {cred.is_internal && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-amber-500 bg-amber-50 dark:bg-amber-500/10 flex items-center gap-1 w-fit"><Shield className="h-3 w-3" /> Internal</span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => { setEditItem(cred); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(cred.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
      </motion.div>

      {/* Edit Modal */}
      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Credential</ModalTitle>
          </ModalHeader>
          {editItem && <CredentialForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>
    </div>
  );
}
