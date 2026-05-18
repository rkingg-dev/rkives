"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { taskData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, AlertCircle, Pause } from "lucide-react";

const filters = ["All", "Current Tasks", "Completed"];
const priorities = ["All", "High", "Medium", "Low"];

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

export default function TasksPage() {
  const [filter, setFilter] = useState("All");
  const [priority, setPriority] = useState("All");

  const filtered = taskData.filter((t) => {
    if (filter === "Current Tasks" && t.status === "Done") return false;
    if (filter === "Completed" && t.status !== "Done") return false;
    if (priority !== "All" && t.priority !== priority) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                priority === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Task</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Website</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task) => (
              <tr key={task.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                <td className="px-5 py-3">
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit", getStatusColor(task.status))}>
                    {getStatusIcon(task.status)} {task.status}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-foreground">{task.task}</td>
                <td className="px-5 py-3 text-muted-foreground">{task.website}</td>
                <td className="px-5 py-3 text-foreground">{task.priority}</td>
                <td className="px-5 py-3 text-muted-foreground">{task.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
