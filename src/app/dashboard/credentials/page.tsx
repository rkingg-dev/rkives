"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { credentialData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, ExternalLink, Lock, Shield } from "lucide-react";

export default function CredentialsPage() {
  const [visible, setVisible] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">Credentials</h2>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md text-amber-500 bg-amber-50 dark:bg-amber-500/10">
            <Shield className="h-3 w-3" /> Encrypted
          </span>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Add Credential
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
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Login URL</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Username</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Password</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Access</th>
            </tr>
          </thead>
          <tbody>
            {credentialData.map((cred) => (
              <tr key={cred.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">{cred.website}</td>
                <td className="px-5 py-3 text-muted-foreground">{cred.type}</td>
                <td className="px-5 py-3">
                  <a href={cred.loginUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                    Open <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
                <td className="px-5 py-3 text-foreground font-mono text-xs">{cred.username}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {visible === cred.id ? "password123" : cred.password}
                    </span>
                    <button
                      onClick={() => setVisible(visible === cred.id ? null : cred.id)}
                      className="p-1 rounded-md hover:bg-muted transition-colors"
                    >
                      {visible === cred.id ? (
                        <EyeOff className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <Eye className="h-3 w-3 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-5 py-3">
                  {cred.isInternal && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-amber-500 bg-amber-50 dark:bg-amber-500/10 flex items-center gap-1 w-fit">
                      <Lock className="h-3 w-3" /> Internal Only
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
