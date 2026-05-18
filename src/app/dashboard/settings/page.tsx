"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Link as LinkIcon, CreditCard, Users, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "integrations", label: "Integrations", icon: LinkIcon },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const integrations = [
  { name: "Google Analytics", connected: true, description: "Track website traffic and user behavior" },
  { name: "Google Ads", connected: true, description: "Monitor ad campaigns and performance" },
  { name: "Meta Ads", connected: false, description: "Manage Facebook and Instagram ads" },
  { name: "Stripe", connected: true, description: "Process payments and track revenue" },
  { name: "Slack", connected: false, description: "Send notifications to your team" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Settings</h2>

      <div className="flex gap-6">
        {/* Settings Nav */}
        <div className="w-[200px] shrink-0">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 text-left",
                  activeTab === tab.id
                    ? "bg-sidebar-active text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-sidebar-active/50 hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Profile Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Name</label>
                  <input type="text" defaultValue="R King Garcia" className="mt-1 w-full h-9 rounded-lg border border-border bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Email</label>
                  <input type="email" defaultValue="rking@example.com" className="mt-1 w-full h-9 rounded-lg border border-border bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Company</label>
                  <input type="text" defaultValue="Rkives" className="mt-1 w-full h-9 rounded-lg border border-border bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "integrations" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Integrations</h3>
              <div className="space-y-3">
                {integrations.map((int) => (
                  <div key={int.name} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{int.name}</p>
                      <p className="text-xs text-muted-foreground">{int.description}</p>
                    </div>
                    <button
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        int.connected
                          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {int.connected ? "Connected" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Billing</h3>
              <div className="rounded-xl border border-border p-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Pro Plan</p>
                    <p className="text-xs text-muted-foreground">$29/month - Billed monthly</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Team Members</h3>
              <p className="text-sm text-muted-foreground">No team members yet. Invite people to collaborate on your dashboards.</p>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-2xl border border-border shadow-sm p-6"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                {["Email notifications", "Push notifications", "Weekly digest", "Alert on anomalies"].map((pref) => (
                  <label key={pref} className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">{pref}</span>
                    <div className="h-5 w-9 rounded-full bg-muted relative cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-card shadow-sm" />
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
