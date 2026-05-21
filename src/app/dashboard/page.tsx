"use client";

import dynamic from "next/dynamic";
import QuickActions from "@/components/dashboard/QuickActions";

const DashboardBuilder = dynamic(() => import("@/components/dashboard/DashboardBuilder"), { ssr: false });

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div />
        <QuickActions />
      </div>
      <DashboardBuilder />
    </div>
  );
}
