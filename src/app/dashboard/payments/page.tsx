"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Receipt, CheckCircle, Clock, CreditCard, Pencil, Trash2 } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { toast } from "sonner";

export default function PaymentsPage() {
  const { data: payments, loading, error, refetch } = useSupabaseQuery({ table: "payments", orderBy: { column: "created_at", ascending: false } });
  const { data: clients } = useSupabaseQuery({ table: "clients" });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { remove } = useSupabaseMutation("payments");
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(payments.length / pageSize);
  const paginated = payments.slice((page - 1) * pageSize, page * pageSize);
  const totalReceived = payments.filter((p) => p.status === "Verified").reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
  const now = new Date();
  const thisMonthPayments = payments.filter((p) => {
    const created = new Date(p.created_at);
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this payment?")) return;
    const success = await remove(id);
    if (success) {
      toast.success("Payment deleted");
      refetch();
    } else {
      toast.error("Failed to delete payment");
    }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Payments</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Record Payment</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Record Payment</ModalTitle>
              <ModalDescription>Log a payment received from a client.</ModalDescription>
            </ModalHeader>
            <PaymentForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Payment</ModalTitle>
          </ModalHeader>
          {editItem && <PaymentForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2"><CreditCard className="h-4 w-4 text-muted-foreground" /><p className="text-xs text-muted-foreground uppercase tracking-wider">Total Received</p></div>
          <p className="text-2xl font-semibold text-foreground">{"\u20B1"}{totalReceived.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl border border-border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2"><Clock className="h-4 w-4 text-muted-foreground" /><p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p></div>
          <p className="text-2xl font-semibold text-foreground">{"\u20B1"}{pending.toLocaleString()}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-2"><Receipt className="h-4 w-4 text-muted-foreground" /><p className="text-xs text-muted-foreground uppercase tracking-wider">This Month</p></div>
          <p className="text-2xl font-semibold text-foreground">{thisMonthPayments.length} payments</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Ref #</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Period</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => {
                const client = clients.find((c) => c.id === p.client_id);
                const site = websites.find((w) => w.id === p.website_id);
                return (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => router.push(`/dashboard/invoice?id=${p.id}`)}>
                    <td className="px-5 py-3 font-medium text-foreground">{client?.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{site?.name || "\u2014"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.payment_type}</td>
                    <td className="px-5 py-3 text-foreground font-semibold">{"\u20B1"}{p.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.method}</td>
                    <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{p.reference_number}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.billing_period}</td>
                    <td className="px-5 py-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit", p.status === "Verified" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10")}>
                        {p.status === "Verified" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{p.paid_at || "\u2014"}</td>
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditItem(p); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
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
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={payments.length} pageSize={pageSize} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
      </motion.div>
    </div>
  );
}
