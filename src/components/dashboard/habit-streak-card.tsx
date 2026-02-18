import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, CheckCircle2 } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  completedToday: boolean;
}

interface HabitStreakCardProps {
  habits: Habit[];
}

export function HabitStreakCard({ habits }: HabitStreakCardProps) {
  const completedCount = habits.filter((h) => h.completedToday).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Habit Tracker</CardTitle>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Flame className="h-3 w-3" />
          {completedCount}/{habits.length}
        </Badge>
      </CardHeader>
      <CardContent>
        {habits.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No habits yet. Add some on the Tracking page!
          </p>
        ) : (
          <div className="space-y-2">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center gap-2 text-sm"
              >
                <CheckCircle2
                  className={`h-4 w-4 ${
                    habit.completedToday
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <span
                  className={
                    habit.completedToday ? "text-foreground" : "text-muted-foreground"
                  }
                >
                  {habit.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
