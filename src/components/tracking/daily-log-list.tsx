import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SymptomLog {
  id: number;
  date: string;
  anxietyLevel: number;
  mood: string;
  compulsionCount: number;
  intrusiveThoughtFrequency: string;
}

interface DailyLogListProps {
  logs: SymptomLog[];
}

const moodColors: Record<string, string> = {
  great: "bg-green-500/10 text-green-500 border-green-500/20",
  good: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  neutral: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  bad: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  terrible: "bg-red-500/10 text-red-500 border-red-500/20",
};

export function DailyLogList({ logs }: DailyLogListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Logs</CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No symptom logs yet. Start logging to see your history.
          </p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{log.date}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      Anxiety: {log.anxietyLevel}/10
                    </Badge>
                    <Badge variant="outline" className={moodColors[log.mood]}>
                      {log.mood}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>{log.compulsionCount} compulsions</p>
                  <p className="capitalize">{log.intrusiveThoughtFrequency} thoughts</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
