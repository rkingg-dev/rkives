"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { notesData, websiteData } from "@/lib/mock-data";
import { Search, Lock, Globe, Plus, Tag } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";

export default function NotesPage() {
  const [search, setSearch] = useState("");

  const filtered = notesData.filter((n) => {
    const q = search.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Notes</h2>
        <Modal>
          <ModalTrigger asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"><Plus className="h-4 w-4" /> New Note</button></ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>New Note</ModalTitle><ModalDescription>Create a new note or blog post.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Title</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Content</label><textarea rows={5} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Website</label><Select className="mt-1" options={[{ label: "General", value: "general" }, ...websiteData.map((w) => ({ label: w.name, value: w.id }))]} /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Tags</label><input placeholder="comma separated" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Thumbnail</label><input type="file" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-muted file:text-foreground" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="public" className="rounded border-border" /><label htmlFor="public" className="text-sm text-foreground">Make public</label></div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Save Note</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note, i) => {
          const site = websiteData.find((w) => w.id === note.websiteId);
          return (
            <motion.div key={note.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border shadow-sm p-5 hover:border-border/80 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight">{note.title}</h3>
                {note.isPublic ? <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" /> : <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />}
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
                <span>{note.createdAt}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
