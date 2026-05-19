"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus, Globe, CreditCard, AlertTriangle, CheckSquare } from "lucide-react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { PageSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { CalendarEventForm } from "@/components/forms/CalendarEventForm";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

interface CalendarEvent {
  title: string;
  subtitle: string;
  type: "task" | "domain" | "hosting" | "payment" | "bill";
  color: string;
  icon: React.ElementType;
}

const typeConfig: Record<string, { color: string; icon: React.ElementType }> = {
  task: { color: "bg-blue-500", icon: CheckSquare },
  domain: { color: "bg-orange-500", icon: Globe },
  hosting: { color: "bg-amber-500", icon: Globe },
  payment: { color: "bg-emerald-500", icon: CreditCard },
  bill: { color: "bg-red-500", icon: AlertTriangle },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: tasks, loading, error, refetch } = useSupabaseQuery({ table: "tasks" });
  const { data: websites } = useSupabaseQuery({ table: "websites" });
  const { data: payments } = useSupabaseQuery({ table: "payments" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const events = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};

    function addEvent(dateStr: string, evt: CalendarEvent) {
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push(evt);
    }

    // 1. Task due dates
    tasks.forEach((task) => {
      if (!task.due_date) return;
      const d = new Date(task.due_date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const key = toDateKey(year, month, d.getDate());
        const site = websites.find((w) => w.id === task.website_id);
        addEvent(key, {
          title: task.title,
          subtitle: site?.name || "Personal",
          type: "task",
          color: typeConfig.task.color,
          icon: CheckSquare,
        });
      }
    });

    // 2. Domain expiry dates
    websites.forEach((site) => {
      if (!site.domain_expiry) return;
      const d = new Date(site.domain_expiry);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const key = toDateKey(year, month, d.getDate());
        addEvent(key, {
          title: `Domain expires: ${site.domain_name || site.name}`,
          subtitle: site.name,
          type: "domain",
          color: typeConfig.domain.color,
          icon: Globe,
        });
      }
    });

    // 3. Hosting expiry dates
    websites.forEach((site) => {
      if (!site.hosting_expiry) return;
      const d = new Date(site.hosting_expiry);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const key = toDateKey(year, month, d.getDate());
        addEvent(key, {
          title: `Hosting expires: ${site.hosting_provider || site.name}`,
          subtitle: site.name,
          type: "hosting",
          color: typeConfig.hosting.color,
          icon: Globe,
        });
      }
    });

    // 4. Payments (incoming from clients)
    payments.forEach((p) => {
      if (!p.paid_at) return;
      const d = new Date(p.paid_at);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const key = toDateKey(year, month, d.getDate());
        const client = /* would need clients table */ null;
        addEvent(key, {
          title: `₱${p.amount?.toLocaleString()} received`,
          subtitle: p.payment_type,
          type: "payment",
          color: typeConfig.payment.color,
          icon: CreditCard,
        });
      }
      // Also show billing period start as a reminder
      if (p.billing_period && p.status === "Pending") {
        // Parse billing period like "Aug 2024"
        const parts = p.billing_period.split(" ");
        if (parts.length === 2) {
          const monthIdx = months.findIndex((m) => m.toLowerCase().startsWith(parts[0].toLowerCase()));
          const yr = parseInt(parts[1]);
          if (monthIdx >= 0 && yr === year && monthIdx === month) {
            // Show on the 1st of the billing month
            const key = toDateKey(year, monthIdx, 1);
            addEvent(key, {
              title: `Payment due: ₱${p.amount?.toLocaleString()}`,
              subtitle: p.payment_type,
              type: "bill",
              color: typeConfig.bill.color,
              icon: AlertTriangle,
            });
          }
        }
      }
    });

    // 5. Recurring task due dates (show on 1st of each month)
    const now = new Date();
    tasks.forEach((task) => {
      if (!task.is_recurring) return;
      // Show recurring tasks on the 1st of the current and next month
      const key1 = toDateKey(year, month, 1);
      addEvent(key1, {
        title: task.title,
        subtitle: "Recurring",
        type: "task",
        color: typeConfig.task.color,
        icon: CheckSquare,
      });
    });

    return map;
  }, [tasks, websites, payments, year, month]);

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function prevMonth() { setCurrentDate(new Date(year, month - 1, 1)); }
  function nextMonth() { setCurrentDate(new Date(year, month + 1, 1)); }

  const selectedEvents = selectedDate ? events[selectedDate] || [] : [];

  // Legend
  const legendItems = [
    { label: "Tasks", color: "bg-blue-500" },
    { label: "Domain expiry", color: "bg-orange-500" },
    { label: "Hosting expiry", color: "bg-amber-500" },
    { label: "Payments", color: "bg-emerald-500" },
    { label: "Bills due", color: "bg-red-500" },
  ];

  if (loading) return <PageSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Calendar</h2>
        <Modal open={modalOpen} onOpenChange={setModalOpen}>
          <ModalTrigger asChild>
            <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> New Event
            </button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>New Event</ModalTitle>
              <ModalDescription>Add a new event to the calendar.</ModalDescription>
            </ModalHeader>
            <CalendarEventForm onSuccess={() => { setModalOpen(false); refetch(); }} />
          </ModalContent>
        </Modal>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">{months[month]} {year}</h3>
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-muted transition-colors"><ChevronLeft className="h-4 w-4 text-muted-foreground" /></button>
              <button onClick={() => { setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1)); }} className="px-3 py-1 text-xs font-medium rounded-md hover:bg-muted transition-colors text-muted-foreground">Today</button>
              <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-muted transition-colors"><ChevronRight className="h-4 w-4 text-muted-foreground" /></button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {dayShort.map((d, i) => (
              <div key={i} className="text-xs text-muted-foreground text-center py-2 font-medium">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0 border-t border-border">
            {blanks.map((b) => (
              <div key={`blank-${b}`} className="h-24 border-b border-r border-border/50 bg-muted/20" />
            ))}
            {days.map((day) => {
              const dateKey = toDateKey(year, month, day);
              const dayEvents = events[dateKey] || [];
              const isToday = isCurrentMonth && day === today.getDate();
              const isSelected = selectedDate === dateKey;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(dateKey)}
                  className={cn(
                    "h-24 border-b border-r border-border/50 p-1.5 cursor-pointer transition-colors hover:bg-muted/30",
                    isSelected && "bg-muted/50 ring-1 ring-[var(--accent-brand)]",
                    isToday && "bg-[var(--accent-brand)]/5"
                  )}
                >
                  <span className={cn("text-xs font-medium", isToday ? "bg-[var(--accent-brand)] text-white w-6 h-6 rounded-full flex items-center justify-center" : "text-foreground")}>{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 3).map((evt, i) => (
                      <div key={i} className={cn("text-[10px] text-white font-medium px-1.5 py-0.5 rounded truncate", evt.color)}>
                        {evt.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && <span className="text-[9px] text-muted-foreground">+{dayEvents.length - 3} more</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right sidebar — selected day */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-5 h-fit">
          <div className="mb-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Selected Date</p>
            <p className="text-lg font-semibold text-foreground mt-1">
              {selectedDate ? `${dayNames[new Date(selectedDate + "T12:00:00").getDay()]}, ${months[new Date(selectedDate + "T12:00:00").getMonth()]} ${new Date(selectedDate + "T12:00:00").getDate()}` : "No date selected"}
            </p>
          </div>

          {selectedEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events on this day.</p>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((evt, i) => {
                const Icon = evt.icon;
                return (
                  <div key={i} className="p-3 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("w-2 h-2 rounded-full shrink-0", evt.color)} />
                      <span className="text-sm font-medium text-foreground">{evt.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground ml-4">
                      <Icon className="h-3 w-3" />
                      <span className="capitalize">{evt.type}</span>
                      <span>•</span>
                      <span>{evt.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
