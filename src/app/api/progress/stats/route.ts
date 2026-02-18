import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/drizzle";
import { symptoms, progressLogs, habits } from "@/drizzle/schema";
import { eq, desc, and, gte, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get("days") || "30");
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString().split("T")[0];

  // Average anxiety level over period
  const anxietyStats = db
    .select({
      avg: sql<number>`avg(${symptoms.anxietyLevel})`,
      count: sql<number>`count(*)`,
    })
    .from(symptoms)
    .where(
      and(
        eq(symptoms.userId, session.userId),
        gte(symptoms.date, sinceStr)
      )
    )
    .get();

  // Total exercises completed
  const exerciseStats = db
    .select({
      completed: sql<number>`count(*)`,
      avgAnxietyReduction: sql<number>`avg(${progressLogs.anxietyBefore} - ${progressLogs.anxietyAfter})`,
    })
    .from(progressLogs)
    .where(
      and(
        eq(progressLogs.userId, session.userId),
        eq(progressLogs.completed, true),
        gte(progressLogs.date, sinceStr)
      )
    )
    .get();

  // Habit completion rate
  const totalHabits = db
    .select({ count: sql<number>`count(*)` })
    .from(habits)
    .where(
      and(eq(habits.userId, session.userId), eq(habits.isActive, true))
    )
    .get();

  const habitLogs = db
    .select({ count: sql<number>`count(*)` })
    .from(progressLogs)
    .where(
      and(
        eq(progressLogs.userId, session.userId),
        eq(progressLogs.completed, true),
        gte(progressLogs.date, sinceStr),
        sql`${progressLogs.habitId} IS NOT NULL`
      )
    )
    .get();

  // Recent symptom trend (last 14 entries)
  const symptomTrend = db
    .select({
      date: symptoms.date,
      anxietyLevel: symptoms.anxietyLevel,
      mood: symptoms.mood,
      compulsionCount: symptoms.compulsionCount,
    })
    .from(symptoms)
    .where(eq(symptoms.userId, session.userId))
    .orderBy(desc(symptoms.date))
    .limit(14)
    .all()
    .reverse();

  // Habit completion trend (daily counts for the period)
  const habitTrend = db
    .select({
      date: progressLogs.date,
      completed: sql<number>`sum(case when ${progressLogs.completed} = 1 then 1 else 0 end)`,
      total: sql<number>`count(*)`,
    })
    .from(progressLogs)
    .where(
      and(
        eq(progressLogs.userId, session.userId),
        gte(progressLogs.date, sinceStr),
        sql`${progressLogs.habitId} IS NOT NULL`
      )
    )
    .groupBy(progressLogs.date)
    .orderBy(progressLogs.date)
    .all();

  return NextResponse.json({
    stats: {
      avgAnxiety: anxietyStats?.avg ? Math.round(anxietyStats.avg * 10) / 10 : 0,
      symptomEntries: anxietyStats?.count || 0,
      exercisesCompleted: exerciseStats?.completed || 0,
      avgAnxietyReduction: exerciseStats?.avgAnxietyReduction
        ? Math.round(exerciseStats.avgAnxietyReduction * 10) / 10
        : 0,
      activeHabits: totalHabits?.count || 0,
      habitCompletions: habitLogs?.count || 0,
    },
    symptomTrend,
    habitTrend,
  });
}
