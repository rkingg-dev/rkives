"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Globe,
  FolderKanban,
  CheckSquare,
  Key,
  FileText,
  BarChart3,
  Settings,
  StickyNote,
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useSidebar } from "./SidebarContext";

const iconMap: Record<string, React.ElementType> = {
  layout: LayoutDashboard,
  users: Users,
  globe: Globe,
  folder: FolderKanban,
  tasks: CheckSquare,
  key: Key,
  note: StickyNote,
  chart: BarChart3,
  settings: Settings,
  file: FileText,
};

const mainNav = [
  { label: "Overview", icon: "layout", href: "/dashboard" },
  { label: "Clients", icon: "users", href: "/dashboard/clients" },
  { label: "Websites", icon: "globe", href: "/dashboard/websites" },
  { label: "Projects", icon: "folder", href: "/dashboard/projects" },
  { label: "Tasks", icon: "tasks", href: "/dashboard/tasks" },
  { label: "Credentials", icon: "key", href: "/dashboard/credentials" },
  { label: "Notes", icon: "note", href: "/dashboard/notes" },
];

const bottomNav = [
  { label: "Reports", icon: "file", href: "/dashboard/reports" },
  { label: "Settings", icon: "settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 220 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed left-0 top-0 bottom-0 bg-sidebar border-r border-border flex flex-col z-50 overflow-hidden"
    >
      {/* Logo */}
      <div className="p-5 pb-4 flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center overflow-hidden shrink-0">
          <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v4l-2 2h20l-2-2v-4a8 8 0 0 0-8-8z" fill="currentColor" stroke="none"/>
            <rect x="7" y="13" width="10" height="3" rx="1.5" fill="currentColor" stroke="none"/>
            <circle cx="9.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
            <circle cx="14.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm font-semibold text-foreground tracking-tight whitespace-nowrap"
          >
            rkives
          </motion.span>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {mainNav.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-sidebar-active text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-active/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5">
        {bottomNav.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-sidebar-active text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-active/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}

        <div className={cn("flex items-center pt-3 mt-2 border-t border-border", collapsed ? "justify-center" : "justify-between px-3")}>
          <ThemeToggle />
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
              <span className="text-[11px] text-muted-foreground">by rkingg</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
