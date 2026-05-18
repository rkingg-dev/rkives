"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GitPullRequest, Activity, BookOpen } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/repos", label: "Repos", icon: BookOpen },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
  { href: "/dashboard/pulls", label: "Pull Requests", icon: GitPullRequest },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-950 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Rkives</h1>
        <p className="text-sm text-gray-500">Workflow Dashboard</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
