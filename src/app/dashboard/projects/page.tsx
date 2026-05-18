"use client";

import { motion } from "framer-motion";
import { projectData, websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Project</button>
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
