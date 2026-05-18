"use client";

import { useState } from "react";
import { leadData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  ChevronRight,
  ExternalLink,
  Plus,
  UserPlus,
  Archive,
  Link as LinkIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function getQualityColor(quality: string) {
  switch (quality) {
    case "GOOD":
      return "text-emerald-500 bg-emerald-50";
    case "NEEDS REVIEW":
      return "text-amber-500 bg-amber-50";
    case "NEUTRAL":
      return "text-muted-foreground bg-muted";
    default:
      return "text-muted-foreground bg-muted";
  }
}

function ExpandedRow({ lead }: { lead: any }) {
  return (
    <motion.tr
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-muted/20"
    >
      <td colSpan={6} className="p-0">
        <div className="px-6 py-5 border-l-2 border-orange-400 ml-4">
          <div className="flex items-start gap-8">
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Services Required
                </p>
                <div className="flex gap-1.5">
                  {lead.details?.servicesRequired?.map((s: string) => (
                    <Badge key={s} variant="outline" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Referral Source
                </p>
                <p className="text-sm text-foreground flex items-center gap-1">
                  {lead.details?.referralSource}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Potential Revenue
                </p>
                <p className="text-sm text-foreground">{lead.details?.potentialRevenue}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Lead Score
                </p>
                <p className="text-sm text-foreground">
                  {lead.details?.leadScore} <span className="text-muted-foreground">(High Potential)</span>
                </p>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                  Note
                </p>
                <p className="text-sm text-foreground">{lead.details?.note}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">
                  Lead Score Ring
                </p>
                <ProgressRing value={lead.details?.leadScore || 0} size={64} strokeWidth={5} color="#ef4444" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors">
                View Campaign <ChevronRight className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors">
                <UserPlus className="h-3 w-3" /> Assign to Team
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors">
                <Archive className="h-3 w-3" /> Archive Lead
              </button>
            </div>
          </div>
        </div>
      </td>
    </motion.tr>
  );
}

export default function LeadsTable() {
  const [expandedId, setExpandedId] = useState<string | null>("5");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Company
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Link
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Lead Quality
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Country
              </th>
            </tr>
          </thead>
          <tbody>
            {leadData.map((lead) => (
              <>
                <tr
                  key={lead.id}
                  className={cn(
                    "border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/20",
                    expandedId === lead.id && "bg-muted/20"
                  )}
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                >
                  <td className="px-5 py-3 text-foreground font-medium">{lead.date}</td>
                  <td className="px-5 py-3 text-foreground">{lead.company || "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground">{lead.email}</td>
                  <td className="px-5 py-3">
                    <LinkIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getQualityColor(lead.quality))}>
                      {lead.quality}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{lead.country || "—"}</td>
                </tr>
                <AnimatePresence>
                  {expandedId === lead.id && lead.details && <ExpandedRow key={`expanded-${lead.id}`} lead={lead} />}
                </AnimatePresence>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
