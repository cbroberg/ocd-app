import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { symptoms, habits, progressLogs } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SymptomLogger } from "@/components/tracking/symptom-logger";
import { HabitTracker } from "@/components/tracking/habit-tracker";
import { DailyLogList } from "@/components/tracking/daily-log-list";

export default async function TrackingPage() {
  const session = await getSession();
  if (!session) return null;

  const today = new Date().toISOString().split("T")[0];

  const userHabits = db
    .select()
    .from(habits)
    .where(
      and(eq(habits.userId, session.userId), eq(habits.isActive, true))
    )
    .all();

  const todayLogs = db
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
    todayLogs.filter((l) => l.habitId).map((l) => l.habitId)
  );

  const habitsWithStatus = userHabits.map((h) => ({
    id: h.id,
    name: h.name,
    category: h.category,
    completedToday: completedHabitIds.has(h.id),
  }));

  const recentSymptoms = db
    .select()
    .from(symptoms)
    .where(eq(symptoms.userId, session.userId))
    .orderBy(desc(symptoms.date))
    .limit(10)
    .all();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tracking</h1>
        <p className="text-muted-foreground">
          Log your symptoms and track your daily habits.
        </p>
      </div>

      <Tabs defaultValue="symptoms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="habits">Habits</TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <SymptomLogger />
            <DailyLogList logs={recentSymptoms} />
          </div>
        </TabsContent>

        <TabsContent value="habits">
          <HabitTracker habits={habitsWithStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
