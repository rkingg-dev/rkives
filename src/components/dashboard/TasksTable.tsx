"use client";

import { useState, useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ExternalLink, UserPlus, CheckCircle, SlidersHorizontal, Repeat, AlertTriangle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TableSkeleton } from "@/components/ui/loading-skeleton";

const tabs = ["Task Overview", "Overdue & Due Soon", "Project Timeline", "Maintenance", "Revenue", "Portfolio"];

function getStatusColor(status: string) {
  switch (status) {
    case "Done": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
    case "In Progress": return "text-blue-500 bg-blue-50 dark:bg-blue-500/10";
    case "To Do": return "text-muted-foreground bg-muted";
    case "Waiting": return "text-amber-500 bg-amber-50 dark:bg-amber-500/10";
    case "On Hold": return "text-red-500 bg-red-50 dark:bg-red-500/10";
    case "Live": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
    case "Planning": return "text-muted-foreground bg-muted";
    case "Verified": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
    case "Pending": return "text-amber-500 bg-amber-50 dark:bg-amber-500/10";
    case "Critical": return "text-red-500 bg-red-50 dark:bg-red-500/10";
    case "Update Available": return "text-amber-500 bg-amber-50 dark:bg-amber-500/10";
    case "Up-to-date": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
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

function ExpandedRow({ task, websites, refetch }: { task: any; websites: any[]; refetch: () => void }) {
  const site = websites.find((w) => w.id === task.website_id);
  const { update } = useSupabaseMutation("tasks");

  async function handleMarkDone() {
    const result = await update(task.id, { status: "Done" });
    if (result) {
      toast.success("Task marked as done");
      refetch();
    } else {
      toast.error("Failed to update task");
    }
  }
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
                  <p className="text-sm text-foreground">{task.due_date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Type</p>
                  <p className="text-sm text-foreground">{task.task_type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Assigned To</p>
                  <p className="text-sm text-foreground">{task.assigned_to}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-medium hover:bg-orange-600 transition-colors">
                View Website <ExternalLink className="h-3 w-3" />
              </button>
              <button onClick={() => toast.info("Task assignment coming soon")} className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-xs font-medium hover:bg-muted transition-colors">
                <UserPlus className="h-3 w-3" /> Assign Task
              </button>
              <button onClick={handleMarkDone} className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-xs font-medium hover:bg-muted transition-colors">
                <CheckCircle className="h-3 w-3" /> Mark Done
              </button>
            </div>
          </div>
        </div>
      </td>
    </motion.tr>
  );
}

function EmptyTab({ message }: { message: string }) {
  return (
    <div className="py-12 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export default function TasksTable() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: tasks, loading: loadingTasks, refetch } = useSupabaseQuery({
    table: "tasks",
    orderBy: { column: "created_at", ascending: false },
    limit: 8,
  });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { data: projects } = useSupabaseQuery({ table: "projects", orderBy: { column: "created_at", ascending: false }, limit: 8 });
  const { data: wpUpdates } = useSupabaseQuery({ table: "wp_updates", limit: 8 });
  const { data: payments } = useSupabaseQuery({ table: "payments", orderBy: { column: "created_at", ascending: false }, limit: 8 });
  const { data: clients } = useSupabaseQuery({ table: "clients" });

  const loading = loadingTasks;

  const { overdue, upcoming } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const twoWeeks = new Date(now);
    twoWeeks.setDate(twoWeeks.getDate() + 14);

    const activeTasks = tasks.filter((t) => t.status !== "Done" && t.due_date);

    const overdue = activeTasks
      .filter((t) => new Date(t.due_date) < now)
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

    const upcoming = activeTasks
      .filter((t) => {
        const due = new Date(t.due_date);
        return due >= now && due <= twoWeeks;
      })
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

    return { overdue, upcoming };
  }, [tasks]);

  if (loading) {
    return (
      <div className="relative">
        <div className="flex items-end gap-0 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, i) => (
            <button key={tab} className={cn("relative px-5 py-2.5 text-[13px] font-medium rounded-t-xl transition-all duration-200 -mb-[1px] whitespace-nowrap", i === 0 ? "bg-card text-foreground border border-border border-b-white dark:border-b-card z-10" : "bg-muted/40 text-muted-foreground border border-transparent")}>
              {tab}
            </button>
          ))}
        </div>
        <div className="-mt-[1px]">
          <TableSkeleton rows={5} columns={6} />
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative">
      {/* Folder Tabs */}
      <div className="flex items-end gap-0 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} className={cn("relative px-5 py-2.5 text-[13px] font-medium rounded-t-xl transition-all duration-200 -mb-[1px] whitespace-nowrap", activeTab === i ? "bg-card text-foreground border border-border border-b-white dark:border-b-card z-10" : "bg-muted/40 text-muted-foreground hover:bg-muted/60 border border-transparent")}>
            {tab}
            {i === 1 && overdue.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold rounded-full bg-red-500 text-white">
                {overdue.length}
              </span>
            )}
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

        {/* Tab 0: Task Overview */}
        {activeTab === 0 && (
          tasks.length === 0 ? <EmptyTab message="No tasks to show" /> : (
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
                {tasks.map((task) => {
                  const site = websites.find((w) => w.id === task.website_id);
                  return (
                    <>
                      <tr key={task.id} className={cn("border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/20", expandedId === task.id && "bg-muted/20")} onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}>
                        <td className="px-5 py-3 text-foreground font-medium">{task.created_at?.split("T")[0]}</td>
                        <td className="px-5 py-3 text-foreground">{site?.name || "Personal"}</td>
                        <td className="px-5 py-3 text-muted-foreground">{task.title}</td>
                        <td className="px-5 py-3 text-foreground">{task.assigned_to}</td>
                        <td className="px-5 py-3">
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getStatusColor(task.status))}>{task.status}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>{task.priority}</span>
                        </td>
                        <td className="px-5 py-3">{task.is_recurring && <Repeat className="h-3.5 w-3.5 text-muted-foreground" />}</td>
                      </tr>
                      <AnimatePresence>
                        {expandedId === task.id && <ExpandedRow key={`expanded-${task.id}`} task={task} websites={websites} refetch={refetch} />}
                      </AnimatePresence>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          )
        )}

        {/* Tab 1: Overdue & Due Soon */}
        {activeTab === 1 && (
          overdue.length === 0 && upcoming.length === 0 ? <EmptyTab message="No overdue or upcoming tasks" /> : (
          <div className="overflow-x-auto">
            {overdue.length > 0 && (
              <>
                <div className="flex items-center gap-2 px-5 py-3 bg-red-500/5 border-b border-border">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <h4 className="text-xs font-semibold text-red-500 uppercase tracking-wider">Overdue ({overdue.length})</h4>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Task</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Overdue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overdue.map((task) => {
                      const site = websites.find((w) => w.id === task.website_id);
                      const daysOverdue = Math.floor((new Date().setHours(0,0,0,0) - new Date(task.due_date).setHours(0,0,0,0)) / 86400000);
                      return (
                        <tr key={task.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="px-5 py-3 font-medium text-foreground">{task.title}</td>
                          <td className="px-5 py-3 text-muted-foreground">{site?.name || "Personal"}</td>
                          <td className="px-5 py-3">
                            <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>{task.priority}</span>
                          </td>
                          <td className="px-5 py-3 text-muted-foreground">{task.due_date}</td>
                          <td className="px-5 py-3 text-red-500 font-medium text-xs">{daysOverdue}d overdue</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
            {upcoming.length > 0 && (
              <>
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Due Soon ({upcoming.length})</h4>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Task</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Days Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming.map((task) => {
                      const site = websites.find((w) => w.id === task.website_id);
                      const daysUntil = Math.ceil((new Date(task.due_date).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / 86400000);
                      return (
                        <tr key={task.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="px-5 py-3 font-medium text-foreground">{task.title}</td>
                          <td className="px-5 py-3 text-muted-foreground">{site?.name || "Personal"}</td>
                          <td className="px-5 py-3">
                            <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>{task.priority}</span>
                          </td>
                          <td className="px-5 py-3 text-muted-foreground">{task.due_date}</td>
                          <td className="px-5 py-3 text-xs text-muted-foreground font-medium">
                            {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil}d left`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
          )
        )}

        {/* Tab 2: Project Timeline */}
        {activeTab === 2 && (
          projects.length === 0 ? <EmptyTab message="No projects yet" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Deadline</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Progress</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{project.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{project.project_type}</td>
                    <td className="px-5 py-3 text-muted-foreground">{project.deadline}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-foreground rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getStatusColor(project.status))}>{project.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )
        )}

        {/* Tab 3: Maintenance */}
        {activeTab === 3 && (
          wpUpdates.length === 0 ? <EmptyTab message="No maintenance items" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Item</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Current</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Latest</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {wpUpdates.map((update) => {
                  const site = websites.find((w) => w.id === update.website_id);
                  return (
                    <tr key={update.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-foreground">{site?.name || "—"}</td>
                      <td className="px-5 py-3 font-medium text-foreground">{update.item_name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{update.item_type}</td>
                      <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{update.current_version}</td>
                      <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{update.latest_version}</td>
                      <td className="px-5 py-3">
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getStatusColor(update.status))}>{update.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          )
        )}

        {/* Tab 4: Revenue */}
        {activeTab === 4 && (
          payments.length === 0 ? <EmptyTab message="No payments yet" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Period</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => {
                  const client = clients.find((c) => c.id === p.client_id);
                  return (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-medium text-foreground">{client?.name || "—"}</td>
                      <td className="px-5 py-3 text-muted-foreground">{p.payment_type}</td>
                      <td className="px-5 py-3 font-medium text-foreground">₱{p.amount?.toLocaleString()}</td>
                      <td className="px-5 py-3 text-muted-foreground">{p.method}</td>
                      <td className="px-5 py-3 text-muted-foreground">{p.billing_period}</td>
                      <td className="px-5 py-3">
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getStatusColor(p.status))}>{p.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          )
        )}

        {/* Tab 5: Portfolio */}
        {activeTab === 5 && (
          (() => {
            const portfolioSites = websites.filter((w) => w.is_portfolio);
            return portfolioSites.length === 0 ? <EmptyTab message="No portfolio sites yet" /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioSites.map((site) => {
                    const client = clients.find((c) => c.id === site.client_id);
                    return (
                      <tr key={site.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3 font-medium text-foreground">{site.name}</td>
                        <td className="px-5 py-3 text-muted-foreground">{site.platform}</td>
                        <td className="px-5 py-3 text-muted-foreground">{client?.name || "—"}</td>
                        <td className="px-5 py-3">
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getStatusColor(site.status))}>{site.status}</span>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">₱{(site.monthly_maintenance_fee || 0).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            );
          })()
        )}

      </div>
    </motion.div>
  );
}
