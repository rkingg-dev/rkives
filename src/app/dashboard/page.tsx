"use client";

import KpiTabs from "@/components/dashboard/KpiTabs";
import TrendsChart from "@/components/dashboard/TrendsChart";
import LeadsTable from "@/components/dashboard/LeadsTable";
import SocialWidgets from "@/components/dashboard/SocialWidgets";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-4 min-w-0">
        <KpiTabs />
        <TrendsChart />
        <LeadsTable />
      </div>

      {/* Right Sidebar */}
      <SocialWidgets />
    </div>
  );
}
