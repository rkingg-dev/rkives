"use client";

import { useMemo } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { FolderKanban } from "lucide-react";
import Link from "next/link";

function getStatusColor(status: string) {
  switch (status) {
    case "In Progress": return "bg-blue-500";
    case "Planning": return "bg-muted-foreground";
    case "Review": return "bg-amber-500";
    case "Completed": return "bg-emerald-500";
    default: return "bg-muted-foreground";
  }
}

export default function ActiveProjects() {
  const { data: projects } = useSupabaseQuery({ table: "projects" });
  const { data: websites } = useSupabaseQuery({ table: "websites" });

  const active = useMemo(() => {
    return projects
      .filter((p) => p.status !== "Completed")
      .sort((a, b) => {
        // Sort by deadline proximity
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      })
      .slice(0, 5);
  }, [projects]);

  if (active.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FolderKanban className="h-4 w-4 text-[var(--accent-brand)]" />
          Active Projects
        </h3>
        <Link href="/dashboard/projects" className="text-xs text-[var(--accent-brand)] hover:underline">
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {active.map((project) => {
          const site = websites.find((w) => w.id === project.website_id);
          return (
            <div key={project.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-foreground truncate">{project.name}</p>
                <span className={cn("w-2 h-2 rounded-full shrink-0", getStatusColor(project.status))} />
              </div>
              {site && (
                <p className="text-[10px] text-muted-foreground">{site.name}</p>
              )}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground w-8 text-right">
                  {project.progress}%
                </span>
              </div>
              {project.deadline && (
                <p className="text-[10px] text-muted-foreground">
                  Due {new Date(project.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
