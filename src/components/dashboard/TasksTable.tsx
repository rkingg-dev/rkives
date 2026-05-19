"use client";

import { useState } from "react";
import { taskData, websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, UserPlus, CheckCircle, Link as LinkIcon, SlidersHorizontal, Paperclip, StickyNote, Repeat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Task Overview", "Project Timeline", "Maintenance", "Revenue", "Portfolio"];

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

function getPriorityColor(priority: string) {
  switch (priority) {
    case "Urgent": return "text-red-600 font-semibold";
    case "High": return "text-red-500";
    case "Medium": return "text-amber-500";
    case "Low": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
}

function ExpandedRow({ task }: { task: any }) {
  const site = websiteData.find((w) => w.id === task.websiteId);
  return (
    <motion.tr initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-muted/10">
      <td colSpan={7} className="p-0">
        <div className="px-8 py-5 border-l-2 border-orange-400">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Description</p>
                <p className="text-sm text-foreground">{task.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Website</p>
                  {site ? (
                    <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-brand)] hover:underline flex items-center gap-1">
                      {site.name} <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : <p className="text-sm text-muted-foreground">Personal</p>}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Due Date</p>
                  <p className="text-sm text-foreground">{task.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Type</p>
                  <p className="text-sm text-foreground">{task.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Assigned To</p>
                  <p className="text-sm text-foreground">{task.assignedTo}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-medium hover:bg-orange-600 transition-colors">
                View Website <ExternalLink className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-xs font-medium hover:bg-muted transition-colors">
                <UserPlus className="h-3 w-3" /> Assign Task
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-xs font-medium hover:bg-muted transition-colors">
                <CheckCircle className="h-3 w-3" /> Mark Done
              </button>
            </div>
          </div>
        </div>
      </td>
    </motion.tr>
  );
}

export default function TasksTable() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>("5");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative">
      {/* Folder Tabs */}
      <div className="flex items-end gap-0 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} className={cn("relative px-5 py-2.5 text-[13px] font-medium rounded-t-xl transition-all duration-200 -mb-[1px] whitespace-nowrap", activeTab === i ? "bg-card text-foreground border border-border border-b-white dark:border-b-card z-10" : "bg-muted/40 text-muted-foreground hover:bg-muted/60 border border-transparent")}>
            {tab}
          </button>
        ))}
        <div className="ml-auto pb-2.5">
          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Table Panel */}
      <div className="bg-card rounded-tr-2xl rounded-b-2xl border border-border shadow-sm overflow-hidden -mt-[1px]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {taskData.slice(0, 8).map((task) => {
                const site = websiteData.find((w) => w.id === task.websiteId);
                return (
                  <>
                    <tr key={task.id} className={cn("border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/20", expandedId === task.id && "bg-muted/20")} onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}>
                      <td className="px-5 py-3 text-foreground font-medium">{task.createdAt}</td>
                      <td className="px-5 py-3 text-foreground">{site?.name || "Personal"}</td>
                      <td className="px-5 py-3 text-muted-foreground">{task.title}</td>
                      <td className="px-5 py-3 text-foreground">{task.assignedTo}</td>
                      <td className="px-5 py-3">
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getStatusColor(task.status))}>{task.status}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>{task.priority}</span>
                      </td>
                      <td className="px-5 py-3">{task.isRecurring && <Repeat className="h-3.5 w-3.5 text-muted-foreground" />}</td>
                    </tr>
                    <AnimatePresence>
                      {expandedId === task.id && <ExpandedRow key={`expanded-${task.id}`} task={task} />}
                    </AnimatePresence>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
