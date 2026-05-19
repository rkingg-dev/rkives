"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { credentialData, websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, ExternalLink, Shield, Key, Copy, Lock } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";

export default function PasswordsPage() {
  const [visible, setVisible] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    return credentialData.filter((c) => {
      const site = websiteData.find((w) => w.id === c.websiteId);
      const q = search.toLowerCase();
      return site?.name.toLowerCase().includes(q) || c.label.toLowerCase().includes(q) || c.username.toLowerCase().includes(q);
    });
  }, [search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">Passwords</h2>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md text-amber-500 bg-amber-50 dark:bg-amber-500/10">
            <Lock className="h-3 w-3" /> Encrypted
          </span>
        </div>
        <Modal>
          <ModalTrigger asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Credential</button></ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>Add Credential</ModalTitle><ModalDescription>Store a new login credential.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Website</label><Select className="mt-1" options={websiteData.map((w) => ({ label: w.name, value: w.id }))} placeholder="Select website" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Label</label><input placeholder="WordPress Admin, Hosting, etc." className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Login URL</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Username</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Email</label><input type="email" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Password</label><input type="password" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">2FA Secret (optional)</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Save Credential</button></ModalClose>
            </ModalFooter>
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
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Label</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">URL</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Username</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Password</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">2FA</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Access</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((cred) => {
                const site = websiteData.find((w) => w.id === cred.websiteId);
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
                        <span className="font-mono text-xs text-muted-foreground">{visible === cred.id ? "password123" : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}</span>
                        <button onClick={() => setVisible(visible === cred.id ? null : cred.id)} className="p-1 rounded-md hover:bg-muted transition-colors">
                          {visible === cred.id ? <EyeOff className="h-3 w-3 text-muted-foreground" /> : <Eye className="h-3 w-3 text-muted-foreground" />}
                        </button>
                        <button className="p-1 rounded-md hover:bg-muted transition-colors">
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {cred.totp ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10">Enabled</span> : <span className="text-[10px] text-muted-foreground">—</span>}
                    </td>
                    <td className="px-5 py-3">
                      {cred.isInternal && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-amber-500 bg-amber-50 dark:bg-amber-500/10 flex items-center gap-1 w-fit"><Shield className="h-3 w-3" /> Internal</span>}
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
