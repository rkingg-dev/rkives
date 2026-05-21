"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Bell, User, Settings, LogOut, CreditCard, PanelLeftClose, PanelLeft, Menu, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { collapsed, toggle, toggleMobile } = useSidebar();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  // Notifications state
  const [notiData, setNotiData] = useState<{ dueTasks: any[]; expiringDomains: any[]; pendingPayments: any[] }>({ dueTasks: [], expiringDomains: [], pendingPayments: [] });

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  // Fetch notifications on mount
  useEffect(() => {
    fetch("/api/notifications").then(r => r.json()).then(setNotiData).catch(() => {});
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
      setSearchOpen(data.results?.length > 0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click-outside to close dropdowns
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      if (notiRef.current && !notiRef.current.contains(e.target as Node)) setNotiOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Build notifications from API data with links
  const notifications = [
    ...notiData.dueTasks.map((t) => ({
      id: `task-${t.id}`,
      icon: Clock,
      color: t.priority === "Urgent" ? "text-red-500" : t.priority === "High" ? "text-amber-500" : "text-blue-500",
      title: `Due: ${t.title}`,
      desc: `Priority: ${t.priority}`,
      time: t.due_date,
      href: "/dashboard/tasks",
    })),
    ...notiData.expiringDomains.map((d) => ({
      id: `domain-${d.id}`,
      icon: AlertCircle,
      color: "text-amber-500",
      title: `Domain expiring: ${d.name}`,
      desc: d.domain_expiry,
      time: d.domain_expiry,
      href: "/dashboard/websites",
    })),
    ...notiData.pendingPayments.map((p) => ({
      id: `payment-${p.id}`,
      icon: Clock,
      color: "text-blue-500",
      title: `Pending payment: \u20B1${p.amount?.toLocaleString()}`,
      desc: p.billing_period,
      time: "",
      href: "/dashboard/payments",
    })),
  ];

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
        <div ref={searchRef} className="relative flex items-center gap-2.5 bg-muted/60 rounded-full px-2 py-1.5 flex-1">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setSearchOpen(true)}
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-w-0"
          />
          {searchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
              {searchResults.map((r) => (
                <Link
                  key={`${r.type}-${r.id}`}
                  href={r.href}
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                >
                  <span className="text-xs text-muted-foreground capitalize w-16">{r.type}</span>
                  <div>
                    <div className="text-sm text-foreground">{r.title}</div>
                    {r.subtitle && <div className="text-xs text-muted-foreground">{r.subtitle}</div>}
                  </div>
                </Link>
              ))}
            </div>
          )}
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
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
            )}
          </button>
          {notiOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Notifications</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <Link
                      key={n.id}
                      href={n.href}
                      onClick={() => setNotiOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                    >
                      <n.icon className={`h-4 w-4 mt-0.5 shrink-0 ${n.color}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                        {n.time && <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>}
                      </div>
                    </Link>
                  ))
                )}
              </div>
              <div className="px-4 py-2.5 border-t border-border">
                <button onClick={() => { setNotiOpen(false); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all notifications</button>
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
                <button onClick={() => router.push("/dashboard/settings")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Profile
                </button>
                <button onClick={() => router.push("/dashboard/settings")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  Billing
                </button>
                <button onClick={() => router.push("/dashboard/settings")} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Settings
                </button>
              </div>
              <div className="border-t border-border py-1">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-muted transition-colors text-left"
                >
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
