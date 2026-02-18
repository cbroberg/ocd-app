"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExerciseCard } from "./exercise-card";

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

interface ExerciseListProps {
  exercises: Exercise[];
  completionCounts: Record<number, number>;
}

export function ExerciseList({ exercises, completionCounts }: ExerciseListProps) {
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const filtered = exercises.filter((ex) => {
    if (category !== "all" && ex.category !== category) return false;
    if (difficulty !== "all" && ex.difficulty !== parseInt(difficulty))
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="contamination">Contamination</SelectItem>
            <SelectItem value="checking">Checking</SelectItem>
            <SelectItem value="symmetry">Symmetry</SelectItem>
            <SelectItem value="intrusive-thoughts">Intrusive Thoughts</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="1">Beginner</SelectItem>
            <SelectItem value="2">Easy</SelectItem>
            <SelectItem value="3">Medium</SelectItem>
            <SelectItem value="4">Hard</SelectItem>
            <SelectItem value="5">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No exercises found matching your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} completionCount={completionCounts[exercise.id] || 0} />
          ))}
        </div>
      )}
    </div>
  );
}
