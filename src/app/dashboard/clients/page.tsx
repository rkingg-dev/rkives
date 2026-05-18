"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { clientData, websiteData } from "@/lib/mock-data";
import { Mail, Phone } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";

export default function ClientsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(clientData.length / pageSize);
  const paginated = clientData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Clients</h2>
        <Modal>
          <ModalTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Client</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add Client</ModalTitle>
              <ModalDescription>Add a new client to your workspace.</ModalDescription>
            </ModalHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Name</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Company</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Email</label><input type="email" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Phone</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Address</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Notes</label><textarea rows={3} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Save Client</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Client</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Websites</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            </tr></thead>
            <tbody>
              {paginated.map((client) => {
                const siteCount = websiteData.filter((w) => w.clientId === client.id).length;
                return (
                  <tr key={client.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                    <td className="px-5 py-3"><div className="font-medium text-foreground">{client.name}</div><div className="text-xs text-muted-foreground">{client.company}</div></td>
                    <td className="px-5 py-3"><div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" /> {client.email}</div><div className="flex items-center gap-1.5 text-muted-foreground mt-0.5"><Phone className="h-3 w-3" /> {client.phone}</div></td>
                    <td className="px-5 py-3 text-foreground font-medium">{siteCount}</td>
                    <td className="px-5 py-3"><span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10">{client.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={clientData.length} pageSize={pageSize} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
      </motion.div>
    </div>
  );
}
