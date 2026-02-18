import { Badge } from "@/components/ui/badge";

interface DifficultyBadgeProps {
  difficulty: number;
}

const difficultyConfig: Record<number, { label: string; className: string }> = {
  1: { label: "Beginner", className: "bg-green-500/10 text-green-500 border-green-500/20" },
  2: { label: "Easy", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  3: { label: "Medium", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  4: { label: "Hard", className: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  5: { label: "Advanced", className: "bg-red-500/10 text-red-500 border-red-500/20" },
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty] || difficultyConfig[1];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
