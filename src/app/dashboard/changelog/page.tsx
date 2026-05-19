"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { changelogData, websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Plus, Tag, Calendar, Globe } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";

const typeColors: Record<string, string> = {
  Feature: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
  Fix: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
  Update: "text-violet-500 bg-violet-50 dark:bg-violet-500/10",
  Security: "text-red-500 bg-red-50 dark:bg-red-500/10",
  Maintenance: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
};

export default function ChangelogPage() {
  const [siteFilter, setSiteFilter] = useState("All");

  const sitesWithChangelog = Array.from(new Set(changelogData.map((c) => c.websiteId)));

  const filtered = changelogData.filter((c) => {
    if (siteFilter === "All") return true;
    return c.websiteId === siteFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Changelog</h2>
        <Modal>
          <ModalTrigger asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"><Plus className="h-4 w-4" /> New Entry</button></ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>New Changelog Entry</ModalTitle><ModalDescription>Add a changelog entry for a website.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Website</label><Select className="mt-1" options={websiteData.map((w) => ({ label: w.name, value: w.id }))} placeholder="Select website" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Type</label><Select className="mt-1" options={[{ label: "Feature", value: "feature" }, { label: "Fix", value: "fix" }, { label: "Update", value: "update" }, { label: "Security", value: "security" }, { label: "Maintenance", value: "maintenance" }]} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Title</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Version</label><input placeholder="v1.0.0" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Content</label><textarea rows={4} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Publish Entry</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      {/* Site Filter */}
      <div className="flex gap-1 bg-card border border-border rounded-lg p-1 w-fit overflow-x-auto">
        <button onClick={() => setSiteFilter("All")} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap", siteFilter === "All" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>All Sites</button>
        {sitesWithChangelog.map((siteId) => {
          const site = websiteData.find((w) => w.id === siteId);
          return (
            <button key={siteId} onClick={() => setSiteFilter(siteId)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap", siteFilter === siteId ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
              {site?.name}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filtered.map((entry, i) => {
          const site = websiteData.find((w) => w.id === entry.websiteId);
          return (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border shadow-sm p-5 relative">
              {entry.version && <span className="absolute top-5 right-5 text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{entry.version}</span>}
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", typeColors[entry.type] || "text-muted-foreground bg-muted")}>{entry.type}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Globe className="h-3 w-3" /> {site?.name}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{entry.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{entry.content}</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {entry.publishedAt || "Draft"}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
