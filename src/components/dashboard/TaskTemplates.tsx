"use client";

import { useState } from "react";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { Zap, CheckSquare } from "lucide-react";
import { toast } from "sonner";

const templates = [
  { label: "Monthly Maintenance", type: "Maintenance", priority: "Medium" as const, description: "Monthly site maintenance check" },
  { label: "Domain Renewal", type: "Maintenance", priority: "High" as const, description: "Domain renewal due" },
  { label: "Hosting Renewal", type: "Maintenance", priority: "High" as const, description: "Hosting renewal due" },
  { label: "Security Check", type: "Maintenance", priority: "Medium" as const, description: "Security audit and updates" },
  { label: "Bug Fix", type: "Bug", priority: "High" as const, description: "Bug report to fix" },
  { label: "Content Update", type: "Content", priority: "Low" as const, description: "Content update request" },
];

export default function TaskTemplates() {
  const { insert } = useSupabaseMutation("tasks");
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const [creating, setCreating] = useState<string | null>(null);

  async function handleCreate(template: typeof templates[number]) {
    if (websites.length === 0) {
      toast.error("No websites found — create a website first");
      return;
    }
    setCreating(template.label);
    const now = new Date();
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + 7);

    const result = await insert({
      title: template.label,
      description: template.description,
      task_type: template.type,
      priority: template.priority,
      status: "To Do",
      due_date: dueDate.toISOString().split("T")[0],
    });

    if (result) {
      toast.success(`"${template.label}" task created`);
    } else {
      toast.error("Failed to create task");
    }
    setCreating(null);
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-4 w-4 text-[var(--accent-brand)]" />
        <h3 className="text-sm font-semibold text-foreground">Quick Tasks</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((t) => (
          <button
            key={t.label}
            onClick={() => handleCreate(t)}
            disabled={creating === t.label}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg text-left text-xs hover:bg-muted/50 transition-colors border border-transparent hover:border-border disabled:opacity-50",
            )}
          >
            <CheckSquare className="h-3 w-3 text-muted-foreground shrink-0" />
            <span className="text-foreground truncate">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
