"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  Search,
  Target,
  Share2,
  FileText,
  Settings,
  ChevronDown,
  BarChart3,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  activity: Activity,
  search: Search,
  target: Target,
  share2: Share2,
  fileText: FileText,
  settings: Settings,
};

const mainNav = [
  { label: "Realtime Overview", icon: "activity", href: "/dashboard" },
  { label: "SEO", icon: "search", href: "/dashboard/seo" },
  { label: "Paid Ads", icon: "target", href: "/dashboard/ads" },
  { label: "Social Media", icon: "share2", href: "/dashboard/social" },
];

const dataSources = [
  { label: "Google Analytics", href: "/dashboard/sources/analytics" },
  { label: "Google Ads", href: "/dashboard/sources/ads" },
  { label: "Meta Ads", href: "/dashboard/sources/meta" },
  { label: "Social Platforms", href: "/dashboard/sources/social" },
];

const bottomNav = [
  { label: "Reports", icon: "fileText", href: "/dashboard/reports" },
  { label: "Settings", icon: "settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [sourcesOpen, setSourcesOpen] = useState(true);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] bg-sidebar border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center overflow-hidden">
            <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v4l-2 2h20l-2-2v-4a8 8 0 0 0-8-8z" fill="currentColor" stroke="none"/>
              <rect x="7" y="13" width="10" height="3" rx="1.5" fill="currentColor" stroke="none"/>
              <circle cx="9.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
              <circle cx="14.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">rkives</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {mainNav.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-active text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-active/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        {/* Data Sources */}
        <div className="pt-2">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-muted-foreground hover:bg-sidebar-active/50 hover:text-foreground transition-all duration-200 w-full"
          >
            <BarChart3 className="h-4 w-4" />
            Data Sources
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 ml-auto transition-transform duration-200",
                sourcesOpen && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {sourcesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 pl-3 border-l border-border space-y-0.5 py-1">
                  {dataSources.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-3 py-1.5 rounded-lg text-[12px] transition-colors duration-200",
                        pathname === item.href
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-active text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-active/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="flex items-center justify-between px-3 pt-3 mt-2 border-t border-border">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
            <span className="text-[11px] text-muted-foreground">by rkingg</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
