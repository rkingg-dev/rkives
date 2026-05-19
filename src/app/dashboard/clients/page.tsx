"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { Mail, Phone, Pencil, Trash2 } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { ClientForm } from "@/components/forms/ClientForm";
import { toast } from "sonner";

export default function ClientsPage() {
  const { data: clients, loading, error, refetch } = useSupabaseQuery({ table: "clients", orderBy: { column: "created_at", ascending: false } });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { remove } = useSupabaseMutation("clients");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(clients.length / pageSize);
  const paginated = clients.slice((page - 1) * pageSize, page * pageSize);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this client?")) return;
    const success = await remove(id);
    if (success) {
      toast.success("Client deleted");
      refetch();
    } else {
      toast.error("Failed to delete client");
    }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Clients</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Client</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add Client</ModalTitle>
              <ModalDescription>Add a new client to your workspace.</ModalDescription>
            </ModalHeader>
            <ClientForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Client</ModalTitle>
          </ModalHeader>
          {editItem && <ClientForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Websites</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-5 py-3"></th>
            </tr></thead>
            <tbody>
              {paginated.map((client) => {
                const siteCount = websites.filter((w) => w.client_id === client.id).length;
                return (
                  <tr key={client.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3"><div className="font-medium text-foreground">{client.name}</div><div className="text-xs text-muted-foreground">{client.company}</div></td>
                    <td className="px-5 py-3"><div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" /> {client.email}</div><div className="flex items-center gap-1.5 text-muted-foreground mt-0.5"><Phone className="h-3 w-3" /> {client.phone}</div></td>
                    <td className="px-5 py-3 text-foreground font-medium">{siteCount}</td>
                    <td className="px-5 py-3"><span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10">Active</span></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditItem(client); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(client.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
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
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={clients.length} pageSize={pageSize} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
      </motion.div>
    </div>
  );
}
