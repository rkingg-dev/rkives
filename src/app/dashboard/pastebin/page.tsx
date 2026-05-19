"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pastebinData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Plus, Globe, Lock, Copy, ExternalLink, Code } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";

const langColors: Record<string, string> = {
  sql: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
  typescript: "text-violet-500 bg-violet-50 dark:bg-violet-500/10",
  javascript: "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
  css: "text-pink-500 bg-pink-50 dark:bg-pink-500/10",
  html: "text-orange-500 bg-orange-50 dark:bg-orange-500/10",
};

export default function PastebinPage() {
  const [search, setSearch] = useState("");

  const filtered = pastebinData.filter((p) => {
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Pastebin</h2>
        <Modal>
          <ModalTrigger asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"><Plus className="h-4 w-4" /> New Paste</button></ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>New Paste</ModalTitle><ModalDescription>Create a new code snippet or note.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Title</label><input className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Language</label><Select className="mt-1" options={[{ label: "TypeScript", value: "typescript" }, { label: "JavaScript", value: "javascript" }, { label: "SQL", value: "sql" }, { label: "CSS", value: "css" }, { label: "HTML", value: "html" }, { label: "Python", value: "python" }, { label: "Bash", value: "bash" }, { label: "JSON", value: "json" }]} /></div>
              <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Content</label><textarea rows={8} className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="public" className="rounded border-border" /><label htmlFor="public" className="text-sm text-foreground">Make public (shareable via URL)</label></div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Create Paste</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      <div className="relative max-w-md">
        <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search pastes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((paste, i) => (
          <motion.div key={paste.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:border-border/80 transition-colors">
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{paste.title}</h3>
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", langColors[paste.language] || "text-muted-foreground bg-muted")}>{paste.language}</span>
                </div>
                {paste.isPublic ? <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
              </div>
              <pre className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground font-mono overflow-x-auto max-h-32 overflow-y-auto">{paste.content}</pre>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-muted-foreground">{paste.createdAt}</span>
                <div className="flex items-center gap-2">
                  {paste.shareToken && (
                    <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="h-3 w-3" /> Share
                    </button>
                  )}
                  <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
