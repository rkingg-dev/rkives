"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Settings, LogOut, CreditCard, PanelLeftClose, PanelLeft } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { collapsed, toggle } = useSidebar();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-3 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={toggle}
          className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors shrink-0"
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
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 cursor-pointer hover:opacity-90 transition-opacity"
          />
          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">R King Garcia</p>
                <p className="text-xs text-muted-foreground">rking@rkives.io</p>
              </div>
              <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left">
                <User className="h-4 w-4 text-muted-foreground" />
                Profile
              </button>
              <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                Billing
              </button>
              <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left">
                <Settings className="h-4 w-4 text-muted-foreground" />
                Settings
              </button>
              <div className="border-t border-border mt-1 pt-1">
                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-muted transition-colors text-left">
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
