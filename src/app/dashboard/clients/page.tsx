"use client";

import { motion } from "framer-motion";
import { clientData, websiteData } from "@/lib/mock-data";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Clients</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Add Client</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Websites</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Monthly Fee</th>
                <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {clientData.map((client) => {
                const siteCount = websiteData.filter((w) => w.clientId === client.id).length;
                return (
                  <tr key={client.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                    <td className="px-5 py-3">
                      <div className="font-medium text-foreground">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.company}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" /> {client.email}</div>
                      <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5"><Phone className="h-3 w-3" /> {client.phone}</div>
                    </td>
                    <td className="px-5 py-3 text-foreground font-medium">{siteCount}</td>
                    <td className="px-5 py-3 text-foreground font-medium">{client.monthlyFee}</td>
                    <td className="px-5 py-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10">{client.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
