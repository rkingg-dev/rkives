"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, CheckSquare, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Clients", icon: Users, href: "/dashboard/clients" },
  { label: "Tasks", icon: CheckSquare, href: "/dashboard/tasks" },
  { label: "Payments", icon: CreditCard, href: "/dashboard/payments" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/80 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn("flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors", active ? "text-foreground" : "text-muted-foreground")}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
