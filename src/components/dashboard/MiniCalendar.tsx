"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const typeColors: Record<string, string> = {
  "Bug": "bg-red-500",
  "Feature": "bg-[var(--accent-brand)]",
  "Maintenance": "bg-amber-500",
  "Content": "bg-blue-500",
  "Personal": "bg-purple-500",
};

export default function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: tasks } = useSupabaseQuery({ table: "tasks" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const todayDate = today.getDate();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const events = useMemo(() => {
    const map: Record<string, { label: string; color: string }[]> = {};
    tasks.forEach((task) => {
      if (!task.due_date) return;
      const due = new Date(task.due_date);
      if (due.getFullYear() === year && due.getMonth() === month) {
        const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(due.getDate()).padStart(2, "0")}`;
        if (!map[key]) map[key] = [];
        map[key].push({
          label: task.title,
          color: typeColors[task.task_type] || "bg-gray-400",
        });
      }
    });
    return map;
  }, [tasks, year, month]);

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <Link href="/dashboard/calendar" className="block bg-card rounded-xl border border-border p-4 hover:border-[var(--accent-brand)] transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">{months[month]} {year}</h3>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="p-1 rounded-md hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <button onClick={nextMonth} className="p-1 rounded-md hover:bg-muted transition-colors">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-[10px] text-muted-foreground text-center py-1 font-medium">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {blanks.map((b) => (
          <div key={`blank-${b}`} className="h-7" />
        ))}
        {days.map((day) => {
          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = events[dateKey] || [];
          const isToday = isCurrentMonth && day === todayDate;

          return (
            <div key={day} className={cn("relative h-7 flex items-center justify-center cursor-pointer group", isToday && "bg-[var(--accent-brand)] text-white rounded-md font-semibold")}>
              <span className={cn("text-xs", !isToday && "text-foreground group-hover:text-[var(--accent-brand)]")}>{day}</span>
              {dayEvents.length > 0 && !isToday && (
                <span className={cn("absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full", dayEvents[0].color)} />
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming events */}
      {Object.entries(events)
        .filter(([date]) => new Date(date) >= new Date(year, month, 1) && new Date(date) <= new Date(year, month + 1, 0))
        .slice(0, 3)
        .map(([date, evts]) => (
          <div key={date} className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-muted-foreground">{new Date(date).getDate()} {months[new Date(date).getMonth()]?.slice(0, 3)}</span>
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", evts[0].color)} />
            <span className="text-foreground truncate">{evts[0].label}</span>
          </div>
        ))}
    </Link>
  );
}
