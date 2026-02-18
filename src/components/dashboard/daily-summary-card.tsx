import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Heart, Timer } from "lucide-react";

interface DailySummaryProps {
  anxietyLevel: number | null;
  compulsionCount: number;
  mood: string | null;
  exercisesCompleted: number;
}

export function DailySummaryCard({
  anxietyLevel,
  compulsionCount,
  mood,
  exercisesCompleted,
}: DailySummaryProps) {
  const items = [
    {
      label: "Anxiety",
      value: anxietyLevel !== null ? `${anxietyLevel}/10` : "No data",
      icon: Activity,
    },
    {
      label: "Compulsions",
      value: compulsionCount.toString(),
      icon: Brain,
    },
    {
      label: "Mood",
      value: mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : "No data",
      icon: Heart,
    },
    {
      label: "Exercises",
      value: exercisesCompleted.toString(),
      icon: Timer,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Today&apos;s Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-border p-3"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
