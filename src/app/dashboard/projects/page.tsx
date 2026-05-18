"use client";

import { motion } from "framer-motion";
import { projectData, websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <Modal>
          <ModalTrigger asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Project</button></ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>Add Project</ModalTitle><ModalDescription>Create a new project.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Project Name</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Website</label><Select className="mt-1" options={websiteData.map((w) => ({ label: w.name, value: w.id }))} placeholder="Select website" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Type</label><Select className="mt-1" options={[{ label: "Full Build", value: "full" }, { label: "Redesign", value: "redesign" }, { label: "Landing Page", value: "landing" }, { label: "Web App", value: "webapp" }, { label: "SEO", value: "seo" }]} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Deadline</label><input type="date" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Progress (%)</label><input type="number" min="0" max="100" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Create Project</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectData.map((project, i) => {
          const site = websiteData.find((w) => w.id === project.websiteId);
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl border border-border shadow-sm p-5 hover:border-border/80 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", project.status === "In Progress" ? "text-blue-500 bg-blue-50 dark:bg-blue-500/10" : "text-muted-foreground bg-muted")}>{project.status}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{site?.name || "—"} &middot; {project.type}</p>
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-foreground rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Deadline: {project.deadline}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
