"use client";

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
  Code,
  Shield,
  CreditCard,
  ScrollText,
  Clipboard,
  RefreshCw,
  X,
  Wallet,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  code: Code,
  shield: Shield,
  credit: CreditCard,
  scroll: ScrollText,
  clipboard: Clipboard,
  refresh: RefreshCw,
  wallet: Wallet,
  calendar: Calendar,
};

const mainNav = [
  { label: "Overview", icon: "layout", href: "/dashboard" },
  { label: "Clients", icon: "users", href: "/dashboard/clients" },
  { label: "Websites", icon: "globe", href: "/dashboard/websites" },
  { label: "Projects", icon: "folder", href: "/dashboard/projects" },
  { label: "Tasks", icon: "tasks", href: "/dashboard/tasks" },
  { label: "Calendar", icon: "calendar", href: "/dashboard/calendar" },
  { label: "WordPress", icon: "refresh", href: "/dashboard/wordpress" },
  { label: "Passwords", icon: "shield", href: "/dashboard/passwords" },
  { label: "Payments", icon: "credit", href: "/dashboard/payments" },
  { label: "Finance", icon: "wallet", href: "/dashboard/finance" },
  { label: "Changelog", icon: "scroll", href: "/dashboard/changelog" },
  { label: "Notes", icon: "note", href: "/dashboard/notes" },
  { label: "Pastebin", icon: "code", href: "/dashboard/pastebin" },
];

const bottomNav = [
  { label: "Reports", icon: "file", href: "/dashboard/reports" },
  { label: "Settings", icon: "settings", href: "/dashboard/settings" },
];

function SidebarContent() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <>
      <div className="p-5 pb-4 flex items-center gap-2.5">
        <div className="shrink-0">
          <svg className="h-7 w-7" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            {/* Folder back */}
            <path d="M6 18h52v34a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V18z" fill="currentColor" className="text-muted-foreground" opacity="0.3" />
            {/* Folder tab */}
            <path d="M6 14a4 4 0 0 1 4-4h12l4 4H6z" fill="currentColor" className="text-muted-foreground" opacity="0.4" />
            {/* Folder front */}
            <path d="M6 18h52a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V18z" fill="currentColor" className="text-muted-foreground" opacity="0.5" />
            {/* Ghost body peeking from folder */}
            <path d="M22 38V28c0-4.4 3.6-8 8-8s8 3.6 8 8v10l-2.5-1.9L33 38l-2.5-1.9L28 38l-2.5-1.9L22 38z" fill="white" />
            {/* Ghost sunglasses */}
            <path d="M25.5 28.5c1.7-1.4 4.1-1.6 6.1-.5l-.7 2.9c-1.9-.5-3.8-.4-5.6.5l.2-2.9z" fill="#f97316" />
            <path d="M32.4 28c2.1-1.1 4.4-.9 6.1.5l.2 2.9c-1.8-.9-3.7-1-5.6-.5l-.7-2.9z" fill="#f97316" />
            {/* Ghost bridge */}
            <path d="M31.6 29.8c.8-.3 1.7-.3 2.5 0" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-semibold text-foreground tracking-tight whitespace-nowrap">
            rkives
          </motion.span>
        )}
      </div>

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
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-sidebar-active text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-active/50 hover:text-[var(--accent-brand)]"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive && "text-[var(--accent-brand)]")} />
              {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">{item.label}</motion.span>}
            </Link>
          );
        })}
      </nav>

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
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-sidebar-active text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-active/50 hover:text-[var(--accent-brand)]"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive && "text-[var(--accent-brand)]")} />
              {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">{item.label}</motion.span>}
            </Link>
          );
        })}
        <div className={cn("flex items-center pt-3 mt-2 border-t border-border", collapsed ? "justify-center" : "justify-between px-3")}>
          <ThemeToggle />
          {!collapsed && <span className="text-xs text-muted-foreground">by rkingg</span>}
        </div>
      </div>
    </>
  );
}

export default function Sidebar() {
  const { collapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 68 : 220 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 bg-sidebar border-r border-border flex-col z-50 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMobile} className="fixed inset-0 bg-black/50 z-50 md:hidden" />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="fixed left-0 top-0 bottom-0 w-[260px] bg-sidebar border-r border-border flex flex-col z-50 md:hidden">
              <button onClick={closeMobile} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors z-10">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
