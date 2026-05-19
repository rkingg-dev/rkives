"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Tag } from "lucide-react";
import { taskData, websiteData } from "@/lib/mock-data";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// Events from tasks
function getEvents(year: number, month: number) {
  const events: Record<string, { title: string; website: string; type: string; color: string }[]> = {};

  taskData.forEach((task) => {
    const dueDate = new Date(task.dueDate);
    if (dueDate.getFullYear() === year && dueDate.getMonth() === month) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(dueDate.getDate()).padStart(2, "0")}`;
      const site = websiteData.find((w) => w.id === task.websiteId);
      const colors: Record<string, string> = {
        "Bug": "bg-red-500",
        "Feature": "bg-[var(--accent-brand)]",
        "Maintenance": "bg-amber-500",
        "Content": "bg-blue-500",
        "Personal": "bg-purple-500",
      };
      if (!events[key]) events[key] = [];
      events[key].push({
        title: task.title,
        website: site?.name || "Personal",
        type: task.type,
        color: colors[task.type] || "bg-gray-400",
      });
    }
  });

  // Add recurring invoice on 1st
  const invoiceKey = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  if (!events[invoiceKey]) events[invoiceKey] = [];
  events[invoiceKey].push({ title: "Send monthly invoices", website: "All Clients", type: "Personal", color: "bg-emerald-500" });

  return events;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>("2024-08-05");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const events = getEvents(year, month);

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function prevMonth() { setCurrentDate(new Date(year, month - 1, 1)); }
  function nextMonth() { setCurrentDate(new Date(year, month + 1, 1)); }

  const selectedEvents = selectedDate ? events[selectedDate] || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Calendar</h2>
        <Modal>
          <ModalTrigger asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"><Plus className="h-4 w-4" /> New Event</button></ModalTrigger>
          <ModalContent>
            <ModalHeader><ModalTitle>New Event</ModalTitle><ModalDescription>Schedule a new event or task.</ModalDescription></ModalHeader>
            <div className="space-y-4">
              <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Title</label><input className="mt-1.5 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Date</label><input type="date" className="mt-1.5 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)]" /></div>
                <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Time</label><input type="time" className="mt-1.5 w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)]" /></div>
              </div>
              <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Website</label><Select className="mt-1.5" options={[{ label: "Personal", value: "personal" }, ...websiteData.map((w) => ({ label: w.name, value: w.id }))]} /></div>
              <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Type</label><Select className="mt-1.5" options={[{ label: "Task", value: "task" }, { label: "Meeting", value: "meeting" }, { label: "Deadline", value: "deadline" }, { label: "Invoice", value: "invoice" }, { label: "Personal", value: "personal" }]} /></div>
              <div><label className="text-xs text-muted-foreground uppercase tracking-wider">Notes</label><textarea rows={3} className="mt-1.5 w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent-brand)] resize-none" /></div>
            </div>
            <ModalFooter>
              <ModalClose asChild><button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button></ModalClose>
              <ModalClose asChild><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Create Event</button></ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
              const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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
              {selectedDate ? `${dayNames[new Date(selectedDate).getDay()]}, ${months[new Date(selectedDate).getMonth()]} ${new Date(selectedDate).getDate()}` : "No date selected"}
            </p>
          </div>

          {selectedEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events on this day.</p>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((evt, i) => (
                <div key={i} className="p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("w-2 h-2 rounded-full", evt.color)} />
                    <span className="text-sm font-medium text-foreground">{evt.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground ml-4">
                    <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{evt.type}</span>
                    <span>{evt.website}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
