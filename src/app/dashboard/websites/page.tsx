"use client";

import { motion } from "framer-motion";
import { websiteData, clientData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ExternalLink, Star, AlertTriangle } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";

export default function WebsitesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Websites</h2>
        <Modal>
          <ModalTrigger asChild>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Website</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>Add Website</ModalTitle><ModalDescription>Add a new website to your inventory.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Website Name</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Client</label><select className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"><option>Select client</option>{clientData.map((c) => <option key={c.id}>{c.name}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">URL</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Platform</label><select className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"><option>WordPress</option><option>Next.js</option><option>Webflow</option><option>Other</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Hosting Provider</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Domain Provider</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Domain Expiry</label><input type="date" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Monthly Fee</label><input type="number" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Scope</label><textarea rows={2} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="portfolio" className="rounded border-border" /><label htmlFor="portfolio" className="text-sm text-foreground">Show on portfolio</label></div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Save Website</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Website</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Client</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Deployed</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Domain Expiry</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Monthly</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Portfolio</th>
            </tr></thead>
            <tbody>
              {websiteData.map((site) => {
                const client = clientData.find((c) => c.id === site.clientId);
                const daysUntilDomain = Math.ceil((new Date(site.domainExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={site.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><span className="font-medium text-foreground">{site.name}</span><a href={site.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><ExternalLink className="h-3 w-3" /></a></div><p className="text-xs text-muted-foreground truncate max-w-[200px]">{site.scope}</p></td>
                    <td className="px-5 py-3 text-muted-foreground">{client?.company || "\u2014"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{site.platform}</td>
                    <td className="px-5 py-3"><span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", site.status === "Live" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10")}>{site.status}</span></td>
                    <td className="px-5 py-3 text-muted-foreground">{site.deployDate}</td>
                    <td className="px-5 py-3"><span className={cn("text-xs font-medium flex items-center gap-1", daysUntilDomain < 90 ? "text-amber-500" : "text-muted-foreground")}>{daysUntilDomain < 90 && <AlertTriangle className="h-3 w-3" />}{site.domainExpiry}</span></td>
                    <td className="px-5 py-3 text-foreground font-medium">{site.monthlyFee > 0 ? `\u20B1${site.monthlyFee.toLocaleString()}` : "\u2014"}</td>
                    <td className="px-5 py-3">{site.isPortfolio && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
