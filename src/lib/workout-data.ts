"use client";

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle: string;
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface Workout {
  id: string;
  date: string;
  name: string;
  exercises: WorkoutSet[];
  duration: number; // seconds
  completed: boolean;
}

export interface PersonalRecord {
  exerciseId: string;
  maxWeight: number;
  maxReps: number;
  maxVolume: number; // weight * reps in a single set
  bestSetDate: string;
}

const STORAGE_KEY = "rkives-workout-data";

const defaultExercises: Exercise[] = [
  // Chest
  { id: "ex-bench", name: "Bench Press", category: "Barbell", muscle: "Chest" },
  { id: "ex-incline-bench", name: "Incline Bench Press", category: "Barbell", muscle: "Chest" },
  { id: "ex-db-press", name: "Dumbbell Press", category: "Dumbbell", muscle: "Chest" },
  { id: "ex-flyes", name: "Cable Flyes", category: "Cable", muscle: "Chest" },
  { id: "ex-pushup", name: "Push Ups", category: "Bodyweight", muscle: "Chest" },
  // Back
  { id: "ex-deadlift", name: "Deadlift", category: "Barbell", muscle: "Back" },
  { id: "ex-barbell-row", name: "Barbell Row", category: "Barbell", muscle: "Back" },
  { id: "ex-pullup", name: "Pull Ups", category: "Bodyweight", muscle: "Back" },
  { id: "ex-lat-pulldown", name: "Lat Pulldown", category: "Cable", muscle: "Back" },
  { id: "ex-seated-row", name: "Seated Cable Row", category: "Cable", muscle: "Back" },
  // Legs
  { id: "ex-squat", name: "Squat", category: "Barbell", muscle: "Legs" },
  { id: "ex-leg-press", name: "Leg Press", category: "Machine", muscle: "Legs" },
  { id: "ex-leg-curl", name: "Leg Curl", category: "Machine", muscle: "Legs" },
  { id: "ex-leg-ext", name: "Leg Extension", category: "Machine", muscle: "Legs" },
  { id: "ex-calf-raise", name: "Calf Raise", category: "Machine", muscle: "Legs" },
  { id: "ex-rdl", name: "Romanian Deadlift", category: "Barbell", muscle: "Legs" },
  // Shoulders
  { id: "ex-ohp", name: "Overhead Press", category: "Barbell", muscle: "Shoulders" },
  { id: "ex-lateral-raise", name: "Lateral Raise", category: "Dumbbell", muscle: "Shoulders" },
  { id: "ex-face-pull", name: "Face Pull", category: "Cable", muscle: "Shoulders" },
  { id: "ex-reverse-fly", name: "Reverse Fly", category: "Dumbbell", muscle: "Shoulders" },
  // Arms
  { id: "ex-bicep-curl", name: "Bicep Curl", category: "Dumbbell", muscle: "Arms" },
  { id: "ex-hammer-curl", name: "Hammer Curl", category: "Dumbbell", muscle: "Arms" },
  { id: "ex-tricep-pushdown", name: "Tricep Pushdown", category: "Cable", muscle: "Arms" },
  { id: "ex-skull-crusher", name: "Skull Crusher", category: "Barbell", muscle: "Arms" },
  { id: "ex-dips", name: "Dips", category: "Bodyweight", muscle: "Arms" },
  // Core
  { id: "ex-plank", name: "Plank", category: "Bodyweight", muscle: "Core" },
  { id: "ex-crunch", name: "Crunches", category: "Bodyweight", muscle: "Core" },
  { id: "ex-hanging-raise", name: "Hanging Leg Raise", category: "Bodyweight", muscle: "Core" },
  { id: "ex-ab-wheel", name: "Ab Wheel Rollout", category: "Bodyweight", muscle: "Core" },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadAll(): { exercises: Exercise[]; workouts: Workout[] } {
  if (typeof window === "undefined") return { exercises: defaultExercises, workouts: [] };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        exercises: data.exercises?.length ? data.exercises : defaultExercises,
        workouts: data.workouts || [],
      };
    }
  } catch {}
  return { exercises: defaultExercises, workouts: [] };
}

function saveAll(data: { exercises: Exercise[]; workouts: Workout[] }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Exercise CRUD
export function getExercises(): Exercise[] {
  return loadAll().exercises;
}

export function addExercise(exercise: Omit<Exercise, "id">): Exercise {
  const data = loadAll();
  const newExercise = { ...exercise, id: generateId() };
  data.exercises.push(newExercise);
  saveAll(data);
  return newExercise;
}

export function deleteExercise(id: string) {
  const data = loadAll();
  data.exercises = data.exercises.filter((e) => e.id !== id);
  saveAll(data);
}

// Workout CRUD
export function getWorkouts(): Workout[] {
  return loadAll().workouts;
}

export function getWorkout(id: string): Workout | undefined {
  return loadAll().workouts.find((w) => w.id === id);
}

export function startWorkout(name: string): Workout {
  const data = loadAll();
  const workout: Workout = {
    id: generateId(),
    date: new Date().toISOString(),
    name,
    exercises: [],
    duration: 0,
    completed: false,
  };
  data.workouts.unshift(workout);
  saveAll(data);
  return workout;
}

export function addSetToWorkout(workoutId: string, exerciseId: string, reps: number, weight: number): WorkoutSet | null {
  const data = loadAll();
  const workout = data.workouts.find((w) => w.id === workoutId);
  if (!workout) return null;
  const set: WorkoutSet = {
    id: generateId(),
    exerciseId,
    reps,
    weight,
    completed: true,
  };
  workout.exercises.push(set);
  saveAll(data);
  return set;
}

export function removeSetFromWorkout(workoutId: string, setId: string) {
  const data = loadAll();
  const workout = data.workouts.find((w) => w.id === workoutId);
  if (!workout) return;
  workout.exercises = workout.exercises.filter((s) => s.id !== setId);
  saveAll(data);
}

export function completeWorkout(workoutId: string, duration: number) {
  const data = loadAll();
  const workout = data.workouts.find((w) => w.id === workoutId);
  if (!workout) return;
  workout.completed = true;
  workout.duration = duration;
  saveAll(data);
}

export function deleteWorkout(id: string) {
  const data = loadAll();
  data.workouts = data.workouts.filter((w) => w.id !== id);
  saveAll(data);
}

// Stats
export function getPersonalRecords(exercises: Exercise[], workouts: Workout[]): PersonalRecord[] {
  const records: PersonalRecord[] = [];

  exercises.forEach((ex) => {
    const allSets = workouts
      .flatMap((w) => w.exercises)
      .filter((s) => s.exerciseId === ex.id && s.completed);

    if (allSets.length === 0) return;

    const maxWeight = Math.max(...allSets.map((s) => s.weight));
    const maxReps = Math.max(...allSets.map((s) => s.reps));
    const maxVolume = Math.max(...allSets.map((s) => s.weight * s.reps));
    const bestSet = allSets.reduce((best, s) =>
      s.weight * s.reps > best.weight * best.reps ? s : best
    );

    const bestSetWorkout = workouts.find((w) => w.exercises.some((s) => s.id === bestSet.id));

    records.push({
      exerciseId: ex.id,
      maxWeight,
      maxReps,
      maxVolume,
      bestSetDate: bestSetWorkout?.date || "",
    });
  });

  return records;
}

export function getExerciseHistory(exerciseId: string, workouts: Workout[]): { date: string; maxWeight: number; totalVolume: number; sets: { reps: number; weight: number }[] }[] {
  return workouts
    .filter((w) => w.completed && w.exercises.some((s) => s.exerciseId === exerciseId))
    .map((w) => {
      const sets = w.exercises.filter((s) => s.exerciseId === exerciseId);
      return {
        date: w.date,
        maxWeight: Math.max(...sets.map((s) => s.weight)),
        totalVolume: sets.reduce((sum, s) => sum + s.weight * s.reps, 0),
        sets: sets.map((s) => ({ reps: s.reps, weight: s.weight })),
      };
    })
    .reverse();
}

export function getWorkoutStats(workouts: Workout[]) {
  const completed = workouts.filter((w) => w.completed);
  const thisWeek = completed.filter((w) => {
    const d = new Date(w.date);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return d >= startOfWeek;
  });

  const thisMonth = completed.filter((w) => {
    const d = new Date(w.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const totalVolume = completed.reduce((sum, w) =>
    sum + w.exercises.reduce((s, set) => s + set.weight * set.reps, 0), 0
  );

  const weekVolume = thisWeek.reduce((sum, w) =>
    sum + w.exercises.reduce((s, set) => s + set.weight * set.reps, 0), 0
  );

  return {
    totalWorkouts: completed.length,
    thisWeek: thisWeek.length,
    thisMonth: thisMonth.length,
    totalVolume,
    weekVolume,
    avgDuration: completed.length > 0
      ? Math.round(completed.reduce((sum, w) => sum + w.duration, 0) / completed.length)
      : 0,
  };
}
