import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: number;
  type: "symptom" | "exercise" | "habit";
  description: string;
  date: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const typeColors = {
    symptom: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    exercise: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    habit: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No activity yet. Start tracking to see your progress!
          </p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={`${activity.type}-${activity.id}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={typeColors[activity.type]}
                  >
                    {activity.type}
                  </Badge>
                  <span className="text-sm">{activity.description}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
