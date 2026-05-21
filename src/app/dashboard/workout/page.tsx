"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Dumbbell, Plus, Trash2, Play, Square, Check, Timer,
  TrendingUp, Trophy, ChevronDown, ChevronRight, Search, X,
} from "lucide-react";
import { toast } from "sonner";
import {
  type Exercise, type Workout, type WorkoutSet,
  getExercises, addExercise, deleteExercise,
  getWorkouts, startWorkout, addSetToWorkout, removeSetFromWorkout,
  completeWorkout, deleteWorkout,
  getPersonalRecords, getExerciseHistory, getWorkoutStats,
} from "@/lib/workout-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

const tabs = ["Exercises", "Log Workout", "History", "Progress"];

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Load data on mount
  useEffect(() => {
    setExercises(getExercises());
    setWorkouts(getWorkouts());
  }, []);

  const refresh = useCallback(() => {
    setExercises(getExercises());
    setWorkouts(getWorkouts());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Dumbbell className="h-6 w-6 text-[var(--accent-brand)]" />
        <h1 className="text-2xl font-bold text-foreground">Workout Tracker</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-end gap-0 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={cn(
              "relative px-5 py-2.5 text-[13px] font-medium rounded-t-xl transition-all duration-200 -mb-[1px] whitespace-nowrap",
              activeTab === i
                ? "bg-card text-foreground border border-border border-b-white dark:border-b-card z-10"
                : "bg-muted/40 text-muted-foreground hover:bg-muted/60 border border-transparent"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-card rounded-xl rounded-tl-none border border-border shadow-sm p-5">
        {activeTab === 0 && <ExercisesTab exercises={exercises} refresh={refresh} />}
        {activeTab === 1 && <LogWorkoutTab exercises={exercises} workouts={workouts} refresh={refresh} />}
        {activeTab === 2 && <HistoryTab workouts={workouts} exercises={exercises} refresh={refresh} />}
        {activeTab === 3 && <ProgressTab exercises={exercises} workouts={workouts} />}
      </div>
    </div>
  );
}

// ==================== EXERCISES TAB ====================
function ExercisesTab({ exercises, refresh }: { exercises: Exercise[]; refresh: () => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Barbell");
  const [muscle, setMuscle] = useState("Chest");
  const [search, setSearch] = useState("");

  const categories = ["Barbell", "Dumbbell", "Cable", "Machine", "Bodyweight"];
  const muscles = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

  const filtered = useMemo(() => {
    if (!search) return exercises;
    const q = search.toLowerCase();
    return exercises.filter((e) =>
      e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q)
    );
  }, [exercises, search]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Exercise[]>();
    filtered.forEach((ex) => {
      const list = groups.get(ex.muscle) || [];
      list.push(ex);
      groups.set(ex.muscle, list);
    });
    return groups;
  }, [filtered]);

  function handleAdd() {
    if (!name.trim()) return;
    addExercise({ name: name.trim(), category, muscle });
    setName("");
    setShowAdd(false);
    refresh();
    toast.success("Exercise added");
  }

  function handleDelete(id: string) {
    deleteExercise(id);
    refresh();
    toast.success("Exercise removed");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-3 py-2 bg-foreground text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Exercise
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="flex flex-wrap items-end gap-3 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-muted-foreground mb-1 block">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Exercise name"
              className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Muscle</label>
            <select
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {muscles.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <button onClick={handleAdd} className="h-9 px-4 bg-[var(--accent-brand)] text-white rounded-lg text-xs font-medium hover:opacity-90">
            Save
          </button>
          <button onClick={() => setShowAdd(false)} className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground">
            Cancel
          </button>
        </div>
      )}

      {/* Exercise list grouped by muscle */}
      {Array.from(grouped.entries()).map(([muscle, list]) => (
        <div key={muscle}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{muscle}</h3>
          <div className="space-y-1">
            {list.map((ex) => (
              <div key={ex.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-foreground">{ex.name}</span>
                  <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted">{ex.category}</span>
                </div>
                <button
                  onClick={() => handleDelete(ex.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================== LOG WORKOUT TAB ====================
function LogWorkoutTab({ exercises, workouts, refresh }: { exercises: Exercise[]; workouts: Workout[]; refresh: () => void }) {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);

  // Find incomplete workout
  useEffect(() => {
    const incomplete = workouts.find((w) => !w.completed);
    if (incomplete) {
      setActiveWorkout(incomplete);
      const start = new Date(incomplete.date).getTime();
      setStartTime(start);
      setElapsed(Math.floor((Date.now() - start) / 1000));
      setRunning(true);
    }
  }, [workouts]);

  // Timer
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [running, startTime]);

  function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function handleStart() {
    if (!workoutName.trim()) {
      toast.error("Name your workout");
      return;
    }
    const workout = startWorkout(workoutName.trim());
    setActiveWorkout(workout);
    setStartTime(Date.now());
    setElapsed(0);
    setRunning(true);
    setWorkoutName("");
    refresh();
    toast.success("Workout started");
  }

  function handleAddSet() {
    if (!activeWorkout || !selectedExercise || !reps || !weight) {
      toast.error("Fill in exercise, reps, and weight");
      return;
    }
    addSetToWorkout(activeWorkout.id, selectedExercise, Number(reps), Number(weight));
    setReps("");
    setWeight("");
    refresh();
  }

  function handleRemoveSet(setId: string) {
    if (!activeWorkout) return;
    removeSetFromWorkout(activeWorkout.id, setId);
    refresh();
  }

  function handleComplete() {
    if (!activeWorkout) return;
    completeWorkout(activeWorkout.id, elapsed);
    setActiveWorkout(null);
    setRunning(false);
    setElapsed(0);
    refresh();
    toast.success("Workout completed!");
  }

  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m`;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  }

  // Group sets by exercise
  const groupedSets = useMemo(() => {
    if (!activeWorkout) return [];
    const map = new Map<string, WorkoutSet[]>();
    activeWorkout.exercises.forEach((s) => {
      const list = map.get(s.exerciseId) || [];
      list.push(s);
      map.set(s.exerciseId, list);
    });
    return Array.from(map.entries()).map(([exId, sets]) => ({
      exercise: exercises.find((e) => e.id === exId),
      sets,
    }));
  }, [activeWorkout, exercises]);

  const totalVolume = activeWorkout
    ? activeWorkout.exercises.reduce((sum, s) => sum + s.weight * s.reps, 0)
    : 0;

  // No active workout — show start form
  if (!activeWorkout) {
    return (
      <div className="max-w-md space-y-4">
        <p className="text-sm text-muted-foreground">Start a new workout session.</p>
        <div className="flex gap-2">
          <input
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Workout name (e.g. Push Day)"
            className="flex-1 h-10 px-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
          />
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-4 h-10 bg-foreground text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
          >
            <Play className="h-4 w-4" />
            Start
          </button>
        </div>

        {/* Quick start suggestions */}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-2">Quick start:</p>
          <div className="flex flex-wrap gap-2">
            {["Push Day", "Pull Day", "Leg Day", "Upper Body", "Full Body"].map((name) => (
              <button
                key={name}
                onClick={() => {
                  setWorkoutName(name);
                  setTimeout(() => {
                    const workout = startWorkout(name);
                    setActiveWorkout(workout);
                    setStartTime(Date.now());
                    setElapsed(0);
                    setRunning(true);
                    setWorkoutName("");
                    refresh();
                    toast.success("Workout started");
                  }, 0);
                }}
                className="px-3 py-1.5 rounded-lg border border-border text-xs text-foreground hover:bg-muted/50 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active workout
  return (
    <div className="space-y-5">
      {/* Timer bar */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
        <div>
          <h3 className="text-lg font-bold text-foreground">{activeWorkout.name}</h3>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {formatDuration(elapsed)}</span>
            <span>{activeWorkout.exercises.length} sets</span>
            <span>{totalVolume.toLocaleString()} kg total</span>
          </div>
        </div>
        <button
          onClick={handleComplete}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
        >
          <Check className="h-4 w-4" />
          Finish
        </button>
      </div>

      {/* Add set form */}
      <div className="flex flex-wrap items-end gap-2 p-4 bg-muted/20 rounded-lg border border-border">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs text-muted-foreground mb-1 block">Exercise</label>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm"
          >
            <option value="">Select exercise...</option>
            {Array.from(new Set(exercises.map((e) => e.muscle))).map((muscle) => (
              <optgroup key={muscle} label={muscle}>
                {exercises.filter((e) => e.muscle === muscle).map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="w-20">
          <label className="text-xs text-muted-foreground mb-1 block">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="0"
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm text-center focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="w-20">
          <label className="text-xs text-muted-foreground mb-1 block">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="0"
            className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm text-center focus:outline-none focus:ring-1 focus:ring-ring"
            onKeyDown={(e) => e.key === "Enter" && handleAddSet()}
          />
        </div>
        <button
          onClick={handleAddSet}
          className="h-9 px-4 bg-[var(--accent-brand)] text-white rounded-lg text-xs font-medium hover:opacity-90"
        >
          Add Set
        </button>
      </div>

      {/* Logged sets */}
      {groupedSets.length === 0 ? (
        <div className="py-8 text-center">
          <Dumbbell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No sets logged yet. Add your first set above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groupedSets.map(({ exercise, sets }) => (
            <div key={exercise?.id} className="border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 bg-muted/30 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-foreground">{exercise?.name || "Unknown"}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{exercise?.muscle}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {sets.length} set{sets.length > 1 ? "s" : ""} · {sets.reduce((s, set) => s + set.weight * set.reps, 0).toLocaleString()} kg
                </span>
              </div>
              <div className="divide-y divide-border/50">
                {sets.map((set, i) => (
                  <div key={set.id} className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-6">#{i + 1}</span>
                      <span className="text-sm font-medium text-foreground">{set.weight} kg</span>
                      <span className="text-sm text-muted-foreground">×</span>
                      <span className="text-sm font-medium text-foreground">{set.reps} reps</span>
                    </div>
                    <button
                      onClick={() => handleRemoveSet(set.id)}
                      className="p-1 rounded hover:bg-red-500/10 transition-colors"
                    >
                      <X className="h-3.5 w-3.5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== HISTORY TAB ====================
function HistoryTab({ workouts, exercises, refresh }: { workouts: Workout[]; exercises: Exercise[]; refresh: () => void }) {
  const completed = workouts.filter((w) => w.completed);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    return `${m} min`;
  }

  function handleDelete(id: string) {
    deleteWorkout(id);
    refresh();
    toast.success("Workout deleted");
  }

  if (completed.length === 0) {
    return (
      <div className="py-12 text-center">
        <Dumbbell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No workout history yet. Complete your first workout!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {completed.map((w) => {
        const isExpanded = expandedId === w.id;
        const totalVolume = w.exercises.reduce((sum, s) => sum + s.weight * s.reps, 0);
        const exerciseNames = [...new Set(w.exercises.map((s) => {
          const ex = exercises.find((e) => e.id === s.exerciseId);
          return ex?.name || "Unknown";
        }))];

        return (
          <div key={w.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedId(isExpanded ? null : w.id)}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-medium text-foreground">{w.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(w.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{w.exercises.length} sets</span>
                <span>{totalVolume.toLocaleString()} kg</span>
                <span>{formatDuration(w.duration)}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(w.id); }}
                  className="p-1 rounded hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </button>
              </div>
            </button>
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-border pt-3">
                <p className="text-xs text-muted-foreground mb-2">Exercises: {exerciseNames.join(", ")}</p>
                <div className="space-y-1">
                  {w.exercises.map((set, i) => {
                    const ex = exercises.find((e) => e.id === set.exerciseId);
                    return (
                      <div key={set.id} className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground w-6">#{i + 1}</span>
                        <span className="text-foreground">{ex?.name || "Unknown"}</span>
                        <span className="text-muted-foreground">{set.weight} kg × {set.reps}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ==================== PROGRESS TAB ====================
function ProgressTab({ exercises, workouts }: { exercises: Exercise[]; workouts: Workout[] }) {
  const [selectedExercise, setSelectedExercise] = useState("");
  const stats = getWorkoutStats(workouts);
  const records = getPersonalRecords(exercises, workouts);
  const history = selectedExercise ? getExerciseHistory(selectedExercise, workouts) : [];

  const chartData = history.map((h) => ({
    date: new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weight: h.maxWeight,
    volume: h.totalVolume,
  }));

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Workouts", value: String(stats.totalWorkouts) },
          { label: "This Week", value: String(stats.thisWeek) },
          { label: "This Month", value: String(stats.thisMonth) },
          { label: "Total Volume", value: `${(stats.totalVolume / 1000).toFixed(0)}k kg` },
        ].map((s) => (
          <div key={s.label} className="p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Personal Records */}
      <div>
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-[var(--accent-brand)]" />
          Personal Records
        </h3>
        {records.length === 0 ? (
          <p className="text-xs text-muted-foreground">Complete workouts to see your records.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {records
              .sort((a, b) => b.maxWeight - a.maxWeight)
              .slice(0, 9)
              .map((r) => {
                const ex = exercises.find((e) => e.id === r.exerciseId);
                return (
                  <div key={r.exerciseId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                    <div>
                      <p className="text-xs font-medium text-foreground">{ex?.name}</p>
                      <p className="text-[10px] text-muted-foreground">{ex?.muscle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{r.maxWeight} kg</p>
                      <p className="text-[10px] text-muted-foreground">PR</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Exercise Progress Chart */}
      <div>
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-[var(--accent-brand)]" />
          Exercise Progress
        </h3>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="h-9 px-3 rounded-lg border border-border bg-background text-sm mb-4"
        >
          <option value="">Select exercise to view progress...</option>
          {Array.from(new Set(exercises.map((e) => e.muscle))).map((muscle) => (
            <optgroup key={muscle} label={muscle}>
              {exercises.filter((e) => e.muscle === muscle).map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </optgroup>
          ))}
        </select>

        {selectedExercise && chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit=" kg" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card rounded-xl border border-border shadow-lg p-3 text-xs">
                          <p className="font-medium text-foreground mb-1">{label}</p>
                          <p className="text-muted-foreground">Max: {payload[0]?.value} kg</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="weight" stroke="var(--foreground)" fill="url(#weightGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : selectedExercise ? (
          <p className="text-xs text-muted-foreground py-4">No data for this exercise yet.</p>
        ) : null}
      </div>
    </div>
  );
}
