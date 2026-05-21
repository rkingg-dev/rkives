"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { checkRecurringTasks } from "@/lib/recurring-tasks";
import { Repeat } from "lucide-react";

export default function RecurringTasksWidget() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [suggestions, setSuggestions] = useState<{ task: any; reason: string }[]>([]);

  useEffect(() => {
    checkRecurringTasks().then(setSuggestions).catch(() => {});
  }, []);

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
        <Repeat className="h-4 w-4 text-[var(--accent-brand)]" />
        Recurring Tasks
      </h3>
      <div className="space-y-2">
        {suggestions.map((s) => (
          <div key={s.task.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm text-foreground">{s.task.title}</p>
              <p className="text-xs text-muted-foreground">{s.reason}</p>
            </div>
            <button
              onClick={() => toast.info("Create new task from: " + s.task.title)}
              className="text-xs text-[var(--accent-brand)] hover:underline"
            >
              Create
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
