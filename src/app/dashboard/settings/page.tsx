"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Link as LinkIcon, CreditCard, Users, Bell, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation";
import { toast } from "sonner";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: LinkIcon },
  { id: "roles", label: "Roles & Permissions", icon: Shield },
  { id: "team", label: "Team", icon: Users },
  { id: "integrations", label: "Integrations", icon: LinkIcon },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const integrations = [
  { name: "Supabase", connected: false, description: "Database and authentication" },
  { name: "Vercel", connected: true, description: "Deployment and hosting" },
  { name: "GitHub", connected: true, description: "Version control and repositories" },
  { name: "Stripe", connected: false, description: "Payment processing" },
  { name: "Slack", connected: false, description: "Team notifications" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile data
  const { data: users } = useSupabaseQuery({ table: "users", limit: 1 });
  const user = users[0];
  const { update, loading } = useSupabaseMutation("users");

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileCompany, setProfileCompany] = useState("");

  // Workspace settings
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceCurrency, setWorkspaceCurrency] = useState("PHP");

  // Notification preferences
  const [notifSettings, setNotifSettings] = useState({
    taskDeadlines: true,
    paymentReceived: true,
    domainExpiry: true,
    weeklyDigest: false,
  });

  useEffect(() => {
    if (user) {
      setProfileName(`${user.first_name} ${user.last_name}`.trim());
      setProfileEmail(user.email);
      setProfileCompany(user.company_name);
      setWorkspaceName(user.company_name || "");
      setWorkspaceCurrency("PHP");
    }
  }, [user]);

  async function handleSaveProfile() {
    if (!user) return;
    const [first, ...rest] = profileName.split(" ");
    const result = await update(user.id, {
      first_name: first || "",
      last_name: rest.join(" "),
      email: profileEmail,
      company_name: profileCompany,
    });
    if (result) toast.success("Profile updated");
    else toast.error("Failed to update");
  }

  async function handleSaveWorkspace() {
    if (!user) return;
    const result = await update(user.id, { company_name: workspaceName });
    if (result) toast.success("Workspace updated");
    else toast.error("Failed to update");
  }

  function toggleNotif(key: keyof typeof notifSettings) {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Notification preferences saved");
  }

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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Profile Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Company</label>
                  <input
                    type="text"
                    value={profileCompany}
                    onChange={(e) => setProfileCompany(e.target.value)}
                    className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "workspace" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Workspace Settings</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Workspace Name</label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Currency</label>
                  <input
                    type="text"
                    value={workspaceCurrency}
                    onChange={(e) => setWorkspaceCurrency(e.target.value)}
                    className="mt-1 w-full h-9 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <button
                  onClick={handleSaveWorkspace}
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "roles" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Roles & Permissions</h3>
              <p className="text-sm text-muted-foreground">Manage team roles and access permissions for your workspace.</p>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Team Members</h3>
              <p className="text-sm text-muted-foreground">Invite team members to collaborate on your projects.</p>
            </motion.div>
          )}

          {activeTab === "integrations" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Integrations</h3>
              <div className="space-y-3">
                {integrations.map((int) => (
                  <div key={int.name} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{int.name}</p>
                      <p className="text-xs text-muted-foreground">{int.description}</p>
                    </div>
                    <button
                      onClick={() => toast.info(`${int.name} integration coming soon`)}
                      className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      int.connected
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}>
                      {int.connected ? "Connected" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Billing</h3>
              <div className="rounded-xl border border-border p-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Pro Plan</p>
                    <p className="text-xs text-muted-foreground">Unlimited clients and websites</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">Task deadlines</p>
                    <p className="text-xs text-muted-foreground">Get notified when tasks are due</p>
                  </div>
                  <button
                    onClick={() => toggleNotif("taskDeadlines")}
                    className={`relative w-10 h-6 rounded-full transition-colors ${notifSettings.taskDeadlines ? "bg-[var(--accent-brand)]" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifSettings.taskDeadlines ? "translate-x-4" : ""}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">Payment received</p>
                    <p className="text-xs text-muted-foreground">Get notified when a payment is verified</p>
                  </div>
                  <button
                    onClick={() => toggleNotif("paymentReceived")}
                    className={`relative w-10 h-6 rounded-full transition-colors ${notifSettings.paymentReceived ? "bg-[var(--accent-brand)]" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifSettings.paymentReceived ? "translate-x-4" : ""}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">Domain expiry</p>
                    <p className="text-xs text-muted-foreground">Get notified before a domain expires</p>
                  </div>
                  <button
                    onClick={() => toggleNotif("domainExpiry")}
                    className={`relative w-10 h-6 rounded-full transition-colors ${notifSettings.domainExpiry ? "bg-[var(--accent-brand)]" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifSettings.domainExpiry ? "translate-x-4" : ""}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">Weekly digest</p>
                    <p className="text-xs text-muted-foreground">Receive a summary of your week</p>
                  </div>
                  <button
                    onClick={() => toggleNotif("weeklyDigest")}
                    className={`relative w-10 h-6 rounded-full transition-colors ${notifSettings.weeklyDigest ? "bg-[var(--accent-brand)]" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifSettings.weeklyDigest ? "translate-x-4" : ""}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
