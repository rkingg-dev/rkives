"use client";

import { useState, useEffect, useCallback } from "react";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { cn } from "@/lib/utils";
import { Play, Pause, Square, Clock } from "lucide-react";
import { toast } from "sonner";

interface TimerEntry {
  taskId: string;
  startedAt: number;
  accumulated: number; // seconds accumulated before current session
}

const STORAGE_KEY = "rkives-time-tracker";

function loadTimer(): TimerEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function saveTimer(entry: TimerEntry | null) {
  if (typeof window === "undefined") return;
  if (entry) localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  else localStorage.removeItem(STORAGE_KEY);
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export default function TimeTracker() {
  const { data: tasks } = useSupabaseQuery({ table: "tasks" });
  const [timer, setTimer] = useState<TimerEntry | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  // Load timer from localStorage on mount
  useEffect(() => {
    const stored = loadTimer();
    if (stored) {
      setTimer(stored);
      if (stored.startedAt > 0) {
        setRunning(true);
        const sessionElapsed = Math.floor((Date.now() - stored.startedAt) / 1000);
        setElapsed(stored.accumulated + sessionElapsed);
      } else {
        setElapsed(stored.accumulated);
      }
    }
  }, []);

  // Tick every second when running
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      if (timer && timer.startedAt > 0) {
        const sessionElapsed = Math.floor((Date.now() - timer.startedAt) / 1000);
        setElapsed(timer.accumulated + sessionElapsed);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running, timer]);

  const startTimer = useCallback((taskId: string) => {
    const entry: TimerEntry = { taskId, startedAt: Date.now(), accumulated: 0 };
    setTimer(entry);
    setElapsed(0);
    setRunning(true);
    saveTimer(entry);
  }, []);

  const pauseTimer = useCallback(() => {
    if (!timer) return;
    const sessionSeconds = timer.startedAt > 0 ? Math.floor((Date.now() - timer.startedAt) / 1000) : 0;
    const entry: TimerEntry = { ...timer, startedAt: 0, accumulated: timer.accumulated + sessionSeconds };
    setTimer(entry);
    setRunning(false);
    saveTimer(entry);
  }, [timer]);

  const resumeTimer = useCallback(() => {
    if (!timer) return;
    const entry: TimerEntry = { ...timer, startedAt: Date.now() };
    setTimer(entry);
    setRunning(true);
    saveTimer(entry);
  }, [timer]);

  const stopTimer = useCallback(() => {
    if (!timer) return;
    const task = tasks.find((t) => t.id === timer.taskId);
    const totalSeconds = elapsed;
    saveTimer(null);
    setTimer(null);
    setElapsed(0);
    setRunning(false);
    toast.success(`Logged ${formatTime(totalSeconds)} on "${task?.title || "task"}"`);
  }, [timer, tasks, elapsed]);

  // Show only active tasks that aren't done
  const activeTasks = tasks.filter((t) => t.status !== "Done").slice(0, 8);
  const currentTask = timer ? tasks.find((t) => t.id === timer.taskId) : null;

  if (timer && currentTask) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-[var(--accent-brand)]" />
          <h3 className="text-sm font-semibold text-foreground">Time Tracker</h3>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{currentTask.title}</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatTime(elapsed)}</p>
          </div>
          <div className="flex items-center gap-1">
            {running ? (
              <button onClick={pauseTimer} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Pause">
                <Pause className="h-4 w-4 text-amber-500" />
              </button>
            ) : (
              <button onClick={resumeTimer} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Resume">
                <Play className="h-4 w-4 text-emerald-500" />
              </button>
            )}
            <button onClick={stopTimer} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Stop & Log">
              <Square className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-[var(--accent-brand)]" />
        <h3 className="text-sm font-semibold text-foreground">Time Tracker</h3>
      </div>
      <div className="space-y-1">
        {activeTasks.length === 0 ? (
          <p className="text-xs text-muted-foreground py-2">No active tasks</p>
        ) : (
          activeTasks.slice(0, 5).map((task) => (
            <button
              key={task.id}
              onClick={() => startTimer(task.id)}
              className="flex items-center gap-2 w-full p-2 rounded-lg text-left hover:bg-muted/50 transition-colors"
            >
              <Play className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="text-xs text-foreground truncate">{task.title}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
