"use client";

import { useEffect, useState } from "react";
import { StatsCards } from "@/components/progress/stats-cards";
import { AnxietyChart } from "@/components/progress/anxiety-chart";
import { HabitCompletionChart } from "@/components/progress/habit-completion-chart";
import { DateRangePicker } from "@/components/progress/date-range-picker";

interface Stats {
  avgAnxiety: number;
  exercisesCompleted: number;
  avgAnxietyReduction: number;
  habitCompletions: number;
}

interface SymptomPoint {
  date: string;
  anxietyLevel: number;
  mood: string;
}

interface HabitPoint {
  date: string;
  completed: number;
  total: number;
}

export default function ProgressPage() {
  const [days, setDays] = useState("30");
  const [stats, setStats] = useState<Stats>({
    avgAnxiety: 0,
    exercisesCompleted: 0,
    avgAnxietyReduction: 0,
    habitCompletions: 0,
  });
  const [symptomTrend, setSymptomTrend] = useState<SymptomPoint[]>([]);
  const [habitTrend, setHabitTrend] = useState<HabitPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`/api/progress/stats?days=${days}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setSymptomTrend(data.symptomTrend);
          setHabitTrend(data.habitTrend);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [days]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Progress</h1>
          <p className="text-muted-foreground">
            Track your progress over time.
          </p>
        </div>
        <DateRangePicker value={days} onChange={setDays} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading stats...</p>
        </div>
      ) : (
        <>
          <StatsCards
            avgAnxiety={stats.avgAnxiety}
            exercisesCompleted={stats.exercisesCompleted}
            avgAnxietyReduction={stats.avgAnxietyReduction}
            habitCompletions={stats.habitCompletions}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <AnxietyChart data={symptomTrend} />
            <HabitCompletionChart data={habitTrend} />
          </div>
        </>
      )}
    </div>
  );
}
