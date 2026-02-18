import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { symptoms, habits, progressLogs } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { QuickCheckin } from "@/components/dashboard/quick-checkin";
import { DailySummaryCard } from "@/components/dashboard/daily-summary-card";
import { HabitStreakCard } from "@/components/dashboard/habit-streak-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const today = new Date().toISOString().split("T")[0];

  // Today's symptom log
  const todaySymptom = db
    .select()
    .from(symptoms)
    .where(
      and(eq(symptoms.userId, session.userId), eq(symptoms.date, today))
    )
    .get();

  // User habits with today's completion status
  const userHabits = db
    .select()
    .from(habits)
    .where(
      and(eq(habits.userId, session.userId), eq(habits.isActive, true))
    )
    .all();

  const todayHabitLogs = db
    .select()
    .from(progressLogs)
    .where(
      and(
        eq(progressLogs.userId, session.userId),
        eq(progressLogs.date, today),
        eq(progressLogs.completed, true)
      )
    )
    .all();

  const completedHabitIds = new Set(
    todayHabitLogs.filter((l) => l.habitId).map((l) => l.habitId)
  );

  const habitsWithStatus = userHabits.map((h) => ({
    id: h.id,
    name: h.name,
    completedToday: completedHabitIds.has(h.id),
  }));

  // Today's exercises completed
  const todayExercises = todayHabitLogs.filter((l) => l.exerciseId).length;

  // Recent activity
  const recentSymptoms = db
    .select()
    .from(symptoms)
    .where(eq(symptoms.userId, session.userId))
    .orderBy(desc(symptoms.date))
    .limit(3)
    .all();

  const recentLogs = db
    .select()
    .from(progressLogs)
    .where(eq(progressLogs.userId, session.userId))
    .orderBy(desc(progressLogs.date))
    .limit(3)
    .all();

  const activities = [
    ...recentSymptoms.map((s) => ({
      id: s.id,
      type: "symptom" as const,
      description: `Anxiety: ${s.anxietyLevel}/10, Mood: ${s.mood}`,
      date: s.date,
    })),
    ...recentLogs.map((l) => ({
      id: l.id,
      type: (l.exerciseId ? "exercise" : "habit") as "exercise" | "habit",
      description: l.completed ? "Completed" : "In progress",
      date: l.date,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const showCheckin = !todaySymptom;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here&apos;s your overview for today.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {showCheckin && <QuickCheckin />}
        <DailySummaryCard
          anxietyLevel={todaySymptom?.anxietyLevel ?? null}
          compulsionCount={todaySymptom?.compulsionCount ?? 0}
          mood={todaySymptom?.mood ?? null}
          exercisesCompleted={todayExercises}
        />
        <HabitStreakCard habits={habitsWithStatus} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}
