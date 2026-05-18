"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

const reports = [
  { name: "Monthly Analytics Summary", type: "PDF", date: "Aug 1, 2024", status: "Ready", size: "2.4 MB" },
  { name: "Q3 Performance Report", type: "PDF", date: "Jul 15, 2024", status: "Ready", size: "5.1 MB" },
  { name: "Social Media Weekly", type: "CSV", date: "Aug 4, 2024", status: "Ready", size: "890 KB" },
  { name: "SEO Audit Report", type: "PDF", date: "Jul 28, 2024", status: "Ready", size: "3.8 MB" },
  { name: "Ad Spend Breakdown", type: "XLSX", date: "Aug 3, 2024", status: "Processing", size: "—" },
];

const scheduled = [
  { name: "Weekly Social Report", frequency: "Every Monday", nextRun: "Aug 5, 2024", recipients: 3 },
  { name: "Monthly SEO Summary", frequency: "1st of month", nextRun: "Sep 1, 2024", recipients: 2 },
  { name: "Daily Ad Performance", frequency: "Daily", nextRun: "Aug 5, 2024", recipients: 5 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-white rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
          <FileText className="h-4 w-4" />
          Generate Report
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Recent Exports</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Report</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Size</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 text-foreground font-medium">{r.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.type}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.size}</td>
                <td className="px-5 py-3">
                  <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md ${r.status === "Ready" ? "text-emerald-500 bg-emerald-50" : "text-amber-500 bg-amber-50"}`}>
                    {r.status === "Ready" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                    <Download className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Scheduled Reports</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Report</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Frequency</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Next Run</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Recipients</th>
            </tr>
          </thead>
          <tbody>
            {scheduled.map((s, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 text-foreground font-medium">{s.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.frequency}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.nextRun}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.recipients} people</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
