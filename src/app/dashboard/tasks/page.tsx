"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { toast } from "sonner";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, AlertCircle, Pause, Repeat, Pencil, Trash2 } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody } from "@/components/ui/drawer";
import { Pagination } from "@/components/ui/pagination";
import { TaskForm } from "@/components/forms/TaskForm";

const statusFilters = ["All", "Current Tasks", "Completed"];
const priorityFilters = ["All", "Urgent", "High", "Medium", "Low"];
const typeFilters = ["All", "Bug", "Feature", "Maintenance", "Content", "Personal"];

function getStatusIcon(status: string) {
  switch (status) {
    case "Done": return <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />;
    case "In Progress": return <Clock className="h-3.5 w-3.5 text-blue-500" />;
    case "To Do": return <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />;
    case "Waiting": return <Clock className="h-3.5 w-3.5 text-amber-500" />;
    case "On Hold": return <Pause className="h-3.5 w-3.5 text-red-500" />;
    default: return null;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Done": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
    case "In Progress": return "text-blue-500 bg-blue-50 dark:bg-blue-500/10";
    case "To Do": return "text-muted-foreground bg-muted";
    case "Waiting": return "text-amber-500 bg-amber-50 dark:bg-amber-500/10";
    case "On Hold": return "text-red-500 bg-red-50 dark:bg-red-500/10";
    default: return "text-muted-foreground bg-muted";
  }
}

function getPriorityColor(p: string) {
  switch (p) {
    case "Urgent": return "text-red-600 font-semibold";
    case "High": return "text-red-500";
    case "Medium": return "text-amber-500";
    case "Low": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
}

export default function TasksPage() {
  const { data: tasks, loading, error, refetch } = useSupabaseQuery({ table: "tasks", orderBy: { column: "created_at", ascending: false } });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { update, remove } = useSupabaseMutation("tasks");

  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [type, setType] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (status === "Current Tasks" && t.status === "Done") return false;
      if (status === "Completed" && t.status !== "Done") return false;
      if (priority !== "All" && t.priority !== priority) return false;
      if (type !== "All" && t.task_type !== type) return false;
      return true;
    });
  }, [tasks, status, priority, type]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSelect(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function toggleAll() {
    const ids = paginated.map((t) => t.id);
    if (ids.every((id) => selected.includes(id))) {
      setSelected((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelected((prev) => Array.from(new Set([...prev, ...ids])));
    }
  }

  const allSelected = paginated.length > 0 && paginated.every((t) => selected.includes(t.id));

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const success = await remove(id);
    if (success) {
      toast.success("Task deleted");
      refetch();
    } else {
      toast.error("Failed to delete task");
    }
  }

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <button onClick={() => setDrawerOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">New Task</button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>New Task</DrawerTitle>
              <DrawerDescription>Create a new task for your workflow.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <TaskForm onSuccess={() => { setDrawerOpen(false); refetch(); }} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>

      <Drawer open={editOpen} onOpenChange={setEditOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Task</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {editItem && <TaskForm defaultValues={editItem} onSuccess={() => { setEditOpen(false); setEditItem(null); refetch(); }} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
          {statusFilters.map((f) => (
            <button key={f} onClick={() => { setStatus(f); setPage(1); }} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors", status === f ? "text-[var(--accent-brand)] font-semibold" : "text-muted-foreground hover:text-foreground")}>{f}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
          {priorityFilters.map((p) => (
            <button key={p} onClick={() => { setPriority(p); setPage(1); }} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors", priority === p ? "text-[var(--accent-brand)] font-semibold" : "text-muted-foreground hover:text-foreground")}>{p}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
          {typeFilters.map((t) => (
            <button key={t} onClick={() => { setType(t); setPage(1); }} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors", type === t ? "text-[var(--accent-brand)] font-semibold" : "text-muted-foreground hover:text-foreground")}>{t}</button>
          ))}
        </div>
      </div>
      {selected.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-lg">
          <span className="text-sm text-muted-foreground">{selected.length} selected</span>
          <div className="flex gap-1">
            {["To Do", "In Progress", "Done"].map((s) => (
              <button
                key={s}
                onClick={async () => {
                  for (const id of selected) {
                    await update(id, { status: s });
                  }
                  toast.success(`Updated ${selected.length} tasks to ${s}`);
                  setSelected([]);
                  refetch();
                }}
                className="px-3 py-1 text-xs font-medium rounded-md bg-muted hover:bg-muted/80 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={async () => {
              if (!confirm(`Delete ${selected.length} tasks?`)) return;
              for (const id of selected) {
                await remove(id);
              }
              toast.success(`Deleted ${selected.length} tasks`);
              setSelected([]);
              refetch();
            }}
            className="px-3 py-1 text-xs font-medium rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="w-12 px-5 py-3">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-border" />
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Due</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((task) => {
                const site = websites.find((w) => w.id === task.website_id);
                return (
                  <tr key={task.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3">
                      <input type="checkbox" checked={selected.includes(task.id)} onChange={() => toggleSelect(task.id)} className="rounded border-border" />
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-foreground">{task.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[250px]">{task.description}</div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{site?.name || "Personal"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{task.task_type}</td>
                    <td className="px-5 py-3"><span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>{task.priority}</span></td>
                    <td className="px-5 py-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit", getStatusColor(task.status))}>
                        {getStatusIcon(task.status)} {task.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{task.due_date}</td>
                    <td className="px-5 py-3">{task.is_recurring && <Repeat className="h-3.5 w-3.5 text-muted-foreground" />}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditItem(task); setEditOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(task.id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
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
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={pageSize} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} />
      </motion.div>
    </div>
  );
}
