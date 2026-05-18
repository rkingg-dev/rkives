"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Settings, LogOut, CreditCard, PanelLeftClose, PanelLeft, Menu, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const notifications = [
  { id: 1, icon: CheckCircle, color: "text-emerald-500", title: "Task completed", desc: "Review DNS records — Atlas Digital Group", time: "2m ago" },
  { id: 2, icon: AlertCircle, color: "text-amber-500", title: "Deadline approaching", desc: "Optimize blog thumbnails — GreenLeaf Health", time: "1h ago" },
  { id: 3, icon: Clock, color: "text-blue-500", title: "New assignment", desc: "Add pricing modal — CloudSync Pro", time: "3h ago" },
  { id: 4, icon: CheckCircle, color: "text-emerald-500", title: "Deployment success", desc: "BrightPath Academy — build passed", time: "5h ago" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const { collapsed, toggle, toggleMobile } = useSidebar();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      if (notiRef.current && !notiRef.current.contains(e.target as Node)) setNotiOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={toggleMobile}
          className="md:hidden h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors shrink-0"
        >
          <Menu className="h-4 w-4 text-muted-foreground" />
        </button>
        <button
          onClick={toggle}
          className="hidden md:flex h-10 w-10 rounded-full bg-muted items-center justify-center hover:bg-muted/80 transition-colors shrink-0"
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4 text-muted-foreground" />
          ) : (
            <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <div className="relative flex items-center gap-2.5 bg-muted/60 rounded-full px-2 py-1.5 flex-1">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-w-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div ref={notiRef} className="relative">
          <button
            onClick={() => setNotiOpen(!notiOpen)}
            className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
          </button>
          {notiOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Notifications</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-0">
                    <n.icon className={`h-4 w-4 mt-0.5 shrink-0 ${n.color}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-border">
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 cursor-pointer hover:opacity-90 transition-opacity"
          />
          {open && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">R King Garcia</p>
                <p className="text-xs text-muted-foreground mt-0.5">rking@rkives.io</p>
              </div>
              <div className="py-1">
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Profile
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  Billing
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Settings
                </button>
              </div>
              <div className="border-t border-border py-1">
                <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-muted transition-colors text-left">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
