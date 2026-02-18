"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DifficultyBadge } from "./difficulty-badge";
import { Clock, ChevronRight } from "lucide-react";

interface Exercise {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  estimatedMinutes: number;
  instructions: string | null;
  isSystemExercise: boolean;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base">{exercise.title}</CardTitle>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {exercise.description}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <DifficultyBadge difficulty={exercise.difficulty} />
              <Badge variant="secondary" className="capitalize">
                {exercise.category.replace("-", " ")}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {exercise.estimatedMinutes}m
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{exercise.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {exercise.description}
          </p>
          <div className="flex gap-2">
            <DifficultyBadge difficulty={exercise.difficulty} />
            <Badge variant="secondary" className="capitalize">
              {exercise.category.replace("-", " ")}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {exercise.estimatedMinutes} minutes
            </div>
          </div>
          {exercise.instructions && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Instructions</h4>
              <div className="rounded-lg bg-muted p-3 text-sm whitespace-pre-line">
                {exercise.instructions}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
