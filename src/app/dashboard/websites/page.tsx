"use client";

import { motion } from "framer-motion";
import { websiteData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ExternalLink, Star } from "lucide-react";

export default function WebsitesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Websites</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Add Website
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Website</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Hosting</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Launch</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Hosting Renewal</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Portfolio</th>
            </tr>
          </thead>
          <tbody>
            {websiteData.map((site) => (
              <tr key={site.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{site.name}</span>
                    <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{site.platform}</td>
                <td className="px-5 py-3 text-muted-foreground">{site.hosting}</td>
                <td className="px-5 py-3">
                  <span className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-md",
                    site.status === "Live" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "text-amber-500 bg-amber-50 dark:bg-amber-500/10"
                  )}>
                    {site.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{site.launchDate}</td>
                <td className="px-5 py-3 text-muted-foreground">{site.hostingRenewal}</td>
                <td className="px-5 py-3">
                  {site.isPortfolio && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
