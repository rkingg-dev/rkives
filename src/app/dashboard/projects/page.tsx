"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { toast } from "sonner";

export default function ProjectsPage() {
  const { data: projects, loading, error, refetch } = useSupabaseQuery({ table: "projects", orderBy: { column: "created_at", ascending: false } });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { remove } = useSupabaseMutation("projects");

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const success = await remove(id);
    if (success) {
      toast.success("Project deleted");
      refetch();
    } else {
      toast.error("Failed to delete project");
    }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Project</button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Add Project</ModalTitle>
              <ModalDescription>Create a new project.</ModalDescription>
            </ModalHeader>
            <ProjectForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      <Modal open={editOpen} onOpenChange={setEditOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Edit Project</ModalTitle>
          </ModalHeader>
          {editItem && <ProjectForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
        </ModalContent>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => {
          const site = websites.find((w) => w.id === project.website_id);
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl border border-border shadow-sm p-5 hover:border-border/80 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                <div className="flex items-center gap-1">
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", project.status === "In Progress" ? "text-blue-500 bg-blue-50 dark:bg-blue-500/10" : "text-muted-foreground bg-muted")}>{project.status}</span>
                  <button onClick={() => { setEditItem(project); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{site?.name || "\u2014"} &middot; {project.project_type}</p>
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
