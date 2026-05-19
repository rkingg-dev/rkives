"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import CommandPalette from "@/components/layout/CommandPalette";
import Fab from "@/components/ui/fab";
import BottomNav from "@/components/layout/BottomNav";
import { SidebarProvider, useSidebar } from "@/components/layout/SidebarContext";
import { motion } from "framer-motion";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.div
        animate={{ marginLeft: collapsed ? 68 : 220 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="md:ml-[220px] min-w-0"
      >
        <Navbar />
        <CommandPalette />
        <Fab />
        <BottomNav />
        <main className="p-4 md:p-8 pb-20 md:pb-8">{children}</main>
      </motion.div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
