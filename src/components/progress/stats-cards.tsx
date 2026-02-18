import { Card, CardContent } from "@/components/ui/card";
import { Activity, Dumbbell, Target, TrendingDown } from "lucide-react";

interface StatsCardsProps {
  avgAnxiety: number;
  exercisesCompleted: number;
  avgAnxietyReduction: number;
  habitCompletions: number;
}

export function StatsCards({
  avgAnxiety,
  exercisesCompleted,
  avgAnxietyReduction,
  habitCompletions,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Avg Anxiety",
      value: `${avgAnxiety}/10`,
      icon: Activity,
      description: "Over selected period",
    },
    {
      label: "Exercises Done",
      value: exercisesCompleted.toString(),
      icon: Dumbbell,
      description: "Completed exercises",
    },
    {
      label: "Anxiety Reduction",
      value: avgAnxietyReduction > 0 ? `-${avgAnxietyReduction}` : "0",
      icon: TrendingDown,
      description: "Avg reduction per exercise",
    },
    {
      label: "Habit Completions",
      value: habitCompletions.toString(),
      icon: Target,
      description: "Total habit check-ins",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <stat.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
