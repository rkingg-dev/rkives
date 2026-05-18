"use client";

import KpiTabs from "@/components/dashboard/KpiTabs";
import TrendsChart from "@/components/dashboard/TrendsChart";
import TasksTable from "@/components/dashboard/TasksTable";
import WorkspaceWidgets from "@/components/dashboard/WorkspaceWidgets";

export default function DashboardPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-4 min-w-0">
        <KpiTabs />
        <TrendsChart />
        <TasksTable />
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[280px] shrink-0">
        <WorkspaceWidgets />
      </div>
    </div>
  );
}
