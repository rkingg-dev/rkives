"use client";

import dynamic from "next/dynamic";
import { LayoutDashboard, TrendingUp, CheckSquare, Calendar, DollarSign, Wallet, Clock, FolderKanban, Zap, Globe, FileText, StickyNote, BarChart3, Users, ArrowUpRight } from "lucide-react";

// Lazy load widgets for performance
const DailyFocus = dynamic(() => import("@/components/dashboard/DailyFocus"), { ssr: false });
const KpiTabs = dynamic(() => import("@/components/dashboard/KpiTabs"), { ssr: false });
const TrendsChart = dynamic(() => import("@/components/dashboard/TrendsChart"), { ssr: false });
const TasksTable = dynamic(() => import("@/components/dashboard/TasksTable"), { ssr: false });
const MiniCalendar = dynamic(() => import("@/components/dashboard/MiniCalendar"), { ssr: false });
const CashFlowWidget = dynamic(() => import("@/components/dashboard/CashFlowWidget"), { ssr: false });
const PendingPayments = dynamic(() => import("@/components/dashboard/PendingPayments"), { ssr: false });
const TimeTracker = dynamic(() => import("@/components/dashboard/TimeTracker"), { ssr: false });
const ActiveProjects = dynamic(() => import("@/components/dashboard/ActiveProjects"), { ssr: false });
const TaskTemplates = dynamic(() => import("@/components/dashboard/TaskTemplates"), { ssr: false });
const InvoicePipeline = dynamic(() => import("@/components/dashboard/InvoicePipeline"), { ssr: false });
const WebsiteHealth = dynamic(() => import("@/components/dashboard/WebsiteHealth"), { ssr: false });
const QuickNotes = dynamic(() => import("@/components/dashboard/QuickNotes"), { ssr: false });
const MonthlyComparison = dynamic(() => import("@/components/dashboard/MonthlyComparison"), { ssr: false });
const TaskCompletionRate = dynamic(() => import("@/components/dashboard/TaskCompletionRate"), { ssr: false });
const RecurringTasksWidget = dynamic(() => import("@/components/dashboard/RecurringTasksWidget"), { ssr: false });
const RecentActivityWidget = dynamic(() => import("@/components/dashboard/RecentActivityWidget"), { ssr: false });

export type WidgetSize = "wide" | "medium" | "small";

export interface WidgetDef {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
  defaultSize: WidgetSize;
  defaultW: number;
  defaultH: number;
  minW: number;
  minH: number;
  category: "main" | "sidebar";
}

export const widgetRegistry: WidgetDef[] = [
  {
    id: "daily-focus",
    label: "Today",
    icon: CheckSquare,
    component: DailyFocus,
    defaultSize: "wide",
    defaultW: 12,
    defaultH: 3,
    minW: 6,
    minH: 2,
    category: "main",
  },
  {
    id: "kpis",
    label: "KPI Tiles",
    icon: LayoutDashboard,
    component: KpiTabs,
    defaultSize: "wide",
    defaultW: 12,
    defaultH: 2,
    minW: 6,
    minH: 2,
    category: "main",
  },
  {
    id: "revenue-trend",
    label: "Revenue Trend",
    icon: TrendingUp,
    component: TrendsChart,
    defaultSize: "wide",
    defaultW: 12,
    defaultH: 5,
    minW: 6,
    minH: 4,
    category: "main",
  },
  {
    id: "tasks-table",
    label: "Tasks Table",
    icon: CheckSquare,
    component: TasksTable,
    defaultSize: "wide",
    defaultW: 12,
    defaultH: 7,
    minW: 8,
    minH: 5,
    category: "main",
  },
  {
    id: "monthly-comparison",
    label: "Monthly Comparison",
    icon: ArrowUpRight,
    component: MonthlyComparison,
    defaultSize: "medium",
    defaultW: 6,
    defaultH: 4,
    minW: 4,
    minH: 3,
    category: "main",
  },
  {
    id: "task-velocity",
    label: "Task Velocity",
    icon: Zap,
    component: TaskCompletionRate,
    defaultSize: "medium",
    defaultW: 6,
    defaultH: 4,
    minW: 4,
    minH: 3,
    category: "main",
  },
  {
    id: "mini-calendar",
    label: "Mini Calendar",
    icon: Calendar,
    component: MiniCalendar,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    category: "sidebar",
  },
  {
    id: "cash-flow",
    label: "Cash Flow",
    icon: Wallet,
    component: CashFlowWidget,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 6,
    minW: 3,
    minH: 4,
    category: "sidebar",
  },
  {
    id: "pending-payments",
    label: "Pending Payments",
    icon: DollarSign,
    component: PendingPayments,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 4,
    category: "sidebar",
  },
  {
    id: "time-tracker",
    label: "Time Tracker",
    icon: Clock,
    component: TimeTracker,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 3,
    minW: 3,
    minH: 2,
    category: "sidebar",
  },
  {
    id: "active-projects",
    label: "Active Projects",
    icon: FolderKanban,
    component: ActiveProjects,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 3,
    category: "sidebar",
  },
  {
    id: "task-templates",
    label: "Quick Tasks",
    icon: Zap,
    component: TaskTemplates,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 3,
    minW: 3,
    minH: 2,
    category: "sidebar",
  },
  {
    id: "invoice-pipeline",
    label: "Invoice Pipeline",
    icon: FileText,
    component: InvoicePipeline,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 4,
    minW: 3,
    minH: 3,
    category: "sidebar",
  },
  {
    id: "website-health",
    label: "Website Health",
    icon: Globe,
    component: WebsiteHealth,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 3,
    category: "sidebar",
  },
  {
    id: "quick-notes",
    label: "Quick Notes",
    icon: StickyNote,
    component: QuickNotes,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 4,
    minW: 3,
    minH: 3,
    category: "sidebar",
  },
  {
    id: "recurring-tasks",
    label: "Recurring Tasks",
    icon: CheckSquare,
    component: RecurringTasksWidget,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 3,
    minW: 3,
    minH: 2,
    category: "sidebar",
  },
  {
    id: "recent-activity",
    label: "Recent Activity",
    icon: BarChart3,
    component: RecentActivityWidget,
    defaultSize: "small",
    defaultW: 4,
    defaultH: 5,
    minW: 3,
    minH: 3,
    category: "sidebar",
  },
];

export const defaultLayout = widgetRegistry.map((w, i) => ({
  i: w.id,
  x: 0,
  y: i * 2,
  w: w.defaultW,
  h: w.defaultH,
  minW: w.minW,
  minH: w.minH,
}));

export const defaultVisible = widgetRegistry.map((w) => w.id);

export function getWidget(id: string): WidgetDef | undefined {
  return widgetRegistry.find((w) => w.id === id);
}
