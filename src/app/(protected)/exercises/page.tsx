import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { exercises } from "@/drizzle/schema";
import { eq, or, isNull } from "drizzle-orm";
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Exercises</h1>
        <p className="text-muted-foreground">
          Browse ERP exercises or create your own custom ones.
        </p>
      </div>

      <ExerciseList exercises={allExercises} />
      <ExerciseForm />
    </div>
  );
}
