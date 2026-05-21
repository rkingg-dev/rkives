"use client";

import dynamic from "next/dynamic";

const DashboardBuilder = dynamic(() => import("@/components/dashboard/DashboardBuilder"), { ssr: false });

export default function DashboardPage() {
  return <DashboardBuilder />;
}
