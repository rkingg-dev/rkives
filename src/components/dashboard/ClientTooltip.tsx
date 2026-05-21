"use client";

import { useState, useRef } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";

interface ClientTooltipProps {
  clientId: string;
  children: React.ReactNode;
}

export default function ClientTooltip({ clientId, children }: ClientTooltipProps) {
  const { data: clients } = useSupabaseQuery({ table: "clients" });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { data: payments } = useSupabaseQuery({ table: "payments" });
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const client = clients.find((c) => c.id === clientId);
  if (!client) return <>{children}</>;

  const clientWebsites = websites.filter((w) => w.client_id === clientId);
  const clientPayments = payments.filter((p) => p.client_id === clientId);
  const outstanding = clientPayments
    .filter((p) => p.status !== "Verified" && p.status !== "Paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const lastPayment = clientPayments
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setShow(false), 200);
  }

  return (
    <span className="relative inline-block" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-card border border-border rounded-xl shadow-lg p-3 pointer-events-none">
          <p className="text-xs font-semibold text-foreground mb-2">{client.name}</p>
          {client.company && <p className="text-[10px] text-muted-foreground mb-2">{client.company}</p>}
          {clientWebsites.length > 0 && (
            <div className="mb-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Websites</p>
              {clientWebsites.slice(0, 3).map((w) => (
                <p key={w.id} className="text-[10px] text-foreground">{w.name}</p>
              ))}
              {clientWebsites.length > 3 && <p className="text-[10px] text-muted-foreground">+{clientWebsites.length - 3} more</p>}
            </div>
          )}
          {outstanding > 0 && (
            <p className="text-[10px] text-amber-500 font-medium">₱{outstanding.toLocaleString()} outstanding</p>
          )}
          {lastPayment && (
            <p className="text-[10px] text-muted-foreground mt-1">Last payment: {new Date(lastPayment.created_at).toLocaleDateString()}</p>
          )}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-b border-r border-border rotate-45 -mt-1" />
        </div>
      )}
    </span>
  );
}
