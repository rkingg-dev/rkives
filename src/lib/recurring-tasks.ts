import { supabase } from "./supabase";

export async function checkRecurringTasks() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as any;

  const { data: tasks } = await sb
    .from("tasks")
    .select("*")
    .eq("is_recurring", true)
    .eq("status", "Done");

  if (!tasks || tasks.length === 0) return [];

  const now = new Date();
  const suggestions: { task: any; reason: string }[] = [];

  for (const task of tasks) {
    const completedAt = task.completed_at ? new Date(task.completed_at) : null;
    if (!completedAt) continue;

    const daysSinceCompletion = Math.floor((now.getTime() - completedAt.getTime()) / (1000 * 60 * 60 * 24));

    if (task.recurrence_interval === "monthly" && daysSinceCompletion >= 28) {
      suggestions.push({ task, reason: `Completed ${daysSinceCompletion} days ago (monthly recurrence)` });
    } else if (task.recurrence_interval === "weekly" && daysSinceCompletion >= 6) {
      suggestions.push({ task, reason: `Completed ${daysSinceCompletion} days ago (weekly recurrence)` });
    } else if (task.recurrence_interval === "quarterly" && daysSinceCompletion >= 84) {
      suggestions.push({ task, reason: `Completed ${daysSinceCompletion} days ago (quarterly recurrence)` });
    }
  }

  return suggestions;
}
