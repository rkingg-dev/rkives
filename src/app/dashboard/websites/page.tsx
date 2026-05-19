"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { ExternalLink, Star, AlertTriangle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";
import { WebsiteForm } from "@/components/forms/WebsiteForm";
import { toast } from "sonner";

export default function WebsitesPage() {
  const { data: websites, loading, error, refetch } = useSupabaseQuery({ table: "websites", orderBy: { column: "created_at", ascending: false } });
  const { data: clients } = useSupabaseQuery({ table: "clients" });
  const { remove } = useSupabaseMutation("websites");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const filtered = websites.filter((s) => {
    const client = clients.find((c) => c.id === s.client_id);
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (client?.name || "").toLowerCase().includes(q) ||
      s.platform.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this website?")) return;
    const success = await remove(id);
    if (success) {
      toast.success("Website deleted");
      refetch();
    } else {
      toast.error("Failed to delete website");
    }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Websites</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Website</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add Website</ModalTitle>
              <ModalDescription>Add a new website to your inventory.</ModalDescription>
            </ModalHeader>
            <WebsiteForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Website</ModalTitle>
          </ModalHeader>
          {editItem && <WebsiteForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>

      <input
        type="text"
        placeholder="Search websites..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="h-9 w-full max-w-sm rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Deployed</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Domain Expiry</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Monthly</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Portfolio</th>
              <th className="px-5 py-3"></th>
            </tr></thead>
            <tbody>
              {paginated.map((site) => {
                const client = clients.find((c) => c.id === site.client_id);
                const daysUntilDomain = Math.ceil((new Date(site.domain_expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={site.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><Link href={`/dashboard/websites/${site.id}`} className="font-medium text-foreground hover:underline">{site.name}</Link><a href={site.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><ExternalLink className="h-3 w-3" /></a></div><p className="text-xs text-muted-foreground truncate max-w-[200px]">{site.scope}</p></td>
                    <td className="px-5 py-3 text-muted-foreground">{client?.company || "\u2014"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{site.platform}</td>
                    <td className="px-5 py-3"><span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", site.status === "Live" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10")}>{site.status}</span></td>
                    <td className="px-5 py-3 text-muted-foreground">{site.deploy_date}</td>
                    <td className="px-5 py-3"><span className={cn("text-xs font-medium flex items-center gap-1", daysUntilDomain < 90 ? "text-amber-500" : "text-muted-foreground")}>{daysUntilDomain < 90 && <AlertTriangle className="h-3 w-3" />}{site.domain_expiry}</span></td>
                    <td className="px-5 py-3 text-foreground font-medium">{site.monthly_maintenance_fee > 0 ? `\u20B1${site.monthly_maintenance_fee.toLocaleString()}` : "\u2014"}</td>
                    <td className="px-5 py-3">{site.is_portfolio && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditItem(site); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(site.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
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
    </div>
  );
}
