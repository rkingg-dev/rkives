"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Users, Globe, CheckSquare, CreditCard, StickyNote, Calendar, FileText, Settings, Code } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }

      if (open) return; // Don't trigger shortcuts when palette is open

      // Quick navigation shortcuts
      switch (e.key) {
        case "g":
          // Wait for second key
          break;
        case "n":
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            router.push("/dashboard/tasks");
          }
          break;
        case "p":
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            router.push("/dashboard/payments");
          }
          break;
        case "c":
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            router.push("/dashboard/clients");
          }
          break;
        case "w":
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            router.push("/dashboard/websites");
          }
          break;
        case "f":
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            router.push("/dashboard/finance");
          }
          break;
        case "/":
          e.preventDefault();
          // Focus the search input in navbar
          document.querySelector<HTMLInputElement>('[placeholder="Search..."]')?.focus();
          break;
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, router]);

  useEffect(() => {
    if (search.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
      const data = await res.json();
      setResults(data.results || []);
    }, 200);
    return () => clearTimeout(timer);
  }, [search]);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setSearch("");
    router.push(href);
  }, [router]);

  const iconMap: Record<string, React.ReactNode> = {
    client: <Users className="h-4 w-4" />,
    website: <Globe className="h-4 w-4" />,
    task: <CheckSquare className="h-4 w-4" />,
    note: <StickyNote className="h-4 w-4" />,
  };

  const staticItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Search className="h-4 w-4" /> },
    { label: "Clients", href: "/dashboard/clients", icon: <Users className="h-4 w-4" /> },
    { label: "Websites", href: "/dashboard/websites", icon: <Globe className="h-4 w-4" /> },
    { label: "Tasks", href: "/dashboard/tasks", icon: <CheckSquare className="h-4 w-4" /> },
    { label: "Payments", href: "/dashboard/payments", icon: <CreditCard className="h-4 w-4" /> },
    { label: "Calendar", href: "/dashboard/calendar", icon: <Calendar className="h-4 w-4" /> },
    { label: "Notes", href: "/dashboard/notes", icon: <StickyNote className="h-4 w-4" /> },
    { label: "Pastebin", href: "/dashboard/pastebin", icon: <Code className="h-4 w-4" /> },
    { label: "Reports", href: "/dashboard/reports", icon: <FileText className="h-4 w-4" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <Command>
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search or jump to..."
              className="w-full h-12 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-1">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              <p>No results found.</p>
              <div className="mt-4 text-xs text-muted-foreground/60 space-y-1">
                <p><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">N</kbd> Tasks &nbsp; <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">P</kbd> Payments &nbsp; <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">C</kbd> Clients</p>
                <p><kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">W</kbd> Websites &nbsp; <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">F</kbd> Finance &nbsp; <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">/</kbd> Search</p>
              </div>
            </Command.Empty>

            {results.length > 0 && (
              <Command.Group heading="Search Results">
                {results.map((r) => (
                  <Command.Item
                    key={`${r.type}-${r.id}`}
                    value={`${r.type} ${r.title}`}
                    onSelect={() => navigate(r.href)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-muted transition-colors aria-selected:bg-muted"
                  >
                    {iconMap[r.type] || <Search className="h-4 w-4" />}
                    <div>
                      <div className="text-foreground">{r.title}</div>
                      {r.subtitle && <div className="text-xs text-muted-foreground">{r.subtitle}</div>}
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground capitalize">{r.type}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading="Pages">
              {staticItems.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => navigate(item.href)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-muted transition-colors aria-selected:bg-muted"
                >
                  {item.icon}
                  <span className="text-foreground">{item.label}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
