import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { exercises, progressLogs } from "@/drizzle/schema";
import { eq, or, isNull, and, sql } from "drizzle-orm";
import { ExerciseList } from "@/components/exercises/exercise-list";
import { ExerciseForm } from "@/components/exercises/exercise-form";

export default async function ExercisesPage() {
  const session = await getSession();
  if (!session) return null;

  const allExercises = db
    .select()
    .from(exercises)
    .where(
      or(
        eq(exercises.isSystemExercise, true),
        eq(exercises.userId, session.userId),
        isNull(exercises.userId)
      )
    )
    .all();

  const counts = db
    .select({
      exerciseId: progressLogs.exerciseId,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(progressLogs)
    .where(
      and(
        eq(progressLogs.userId, session.userId),
        eq(progressLogs.completed, true)
      )
    )
    .groupBy(progressLogs.exerciseId)
    .all();

  const completionCounts: Record<number, number> = {};
  for (const row of counts) {
    if (row.exerciseId != null) {
      completionCounts[row.exerciseId] = row.count;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Exercises</h1>
        <p className="text-muted-foreground">
          Browse ERP exercises or create your own custom ones.
        </p>
      </div>

      <ExerciseList exercises={allExercises} completionCounts={completionCounts} />
      <ExerciseForm />
    </div>
  );
}
