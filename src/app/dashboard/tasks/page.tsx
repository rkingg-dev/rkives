"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { taskData, websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, AlertCircle, Pause, Repeat } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";

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
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [type, setType] = useState("All");

  const filtered = taskData.filter((t) => {
    if (status === "Current Tasks" && t.status === "Done") return false;
    if (status === "Completed" && t.status !== "Done") return false;
    if (priority !== "All" && t.priority !== priority) return false;
    if (type !== "All" && t.type !== type) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
        <Modal>
          <ModalTrigger asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">New Task</button></ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>New Task</ModalTitle><ModalDescription>Create a new task.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Title</label><input className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Description</label><textarea rows={3} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Website</label><select className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"><option>Personal</option>{websiteData.map((w) => <option key={w.id}>{w.name}</option>)}</select></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Type</label><select className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"><option>Bug</option><option>Feature</option><option>Maintenance</option><option>Content</option><option>Personal</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Priority</label><select className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></div>
                <div><label className="text-[11px] text-muted-foreground uppercase tracking-wider">Due Date</label><input type="date" className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" /></div>
              </div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Create Task</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {statusFilters.map((f) => (
            <button key={f} onClick={() => setStatus(f)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", status === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{f}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {priorityFilters.map((p) => (
            <button key={p} onClick={() => setPriority(p)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", priority === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{p}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {typeFilters.map((t) => (
            <button key={t} onClick={() => setType(t)} className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", type === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{t}</button>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Due</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => {
                const site = websiteData.find((w) => w.id === task.websiteId);
                return (
                  <tr key={task.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                    <td className="px-5 py-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit", getStatusColor(task.status))}>
                        {getStatusIcon(task.status)} {task.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-foreground">{task.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[250px]">{task.description}</div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{site?.name || "Personal"}</td>
                    <td className="px-5 py-3 text-muted-foreground">{task.type}</td>
                    <td className="px-5 py-3"><span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>{task.priority}</span></td>
                    <td className="px-5 py-3 text-muted-foreground">{task.dueDate}</td>
                    <td className="px-5 py-3">{task.isRecurring && <Repeat className="h-3.5 w-3.5 text-muted-foreground" />}</td>
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
