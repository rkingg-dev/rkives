"use client";

import { useState, useEffect, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleWidgetProps {
  id: string;
  title: string;
  icon: ReactNode;
  badge?: string | number;
  action?: ReactNode;
  children: ReactNode;
  defaultCollapsed?: boolean;
}

export default function CollapsibleWidget({
  id,
  title,
  icon,
  badge,
  action,
  children,
  defaultCollapsed = false,
}: CollapsibleWidgetProps) {
  const storageKey = `rkives-widget-${id}`;
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) setCollapsed(stored === "true");
  }, [storageKey]);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(storageKey, String(next));
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full px-5 py-3 hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {badge !== undefined && badge !== "" && (
            <span className="text-[10px] font-medium text-muted-foreground">{badge}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", collapsed && "-rotate-90")} />
        </div>
      </button>
      {!collapsed && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}
