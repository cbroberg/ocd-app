"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Habit {
  id: number;
  name: string;
  category: string;
  completedToday: boolean;
}

interface HabitTrackerProps {
  habits: Habit[];
}

export function HabitTracker({ habits: initialHabits }: HabitTrackerProps) {
  const router = useRouter();
  const [habits, setHabits] = useState(initialHabits);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [adding, setAdding] = useState(false);

  async function toggleHabit(habitId: number, completed: boolean) {
    const today = new Date().toISOString().split("T")[0];

    try {
      if (completed) {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            habitId,
            date: today,
            completed: true,
          }),
        });
      }

      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, completedToday: completed } : h
        )
      );
      router.refresh();
    } catch {
      toast.error("Failed to update habit");
    }
  }

  async function addHabit(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);

    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          category: newCategory,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setHabits((prev) => [
          ...prev,
          { ...data.habit, completedToday: false },
        ]);
        setNewName("");
        setShowAddForm(false);
        toast.success("Habit added!");
        router.refresh();
      }
    } catch {
      toast.error("Failed to add habit");
    } finally {
      setAdding(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Daily Habits</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <form
            onSubmit={addHabit}
            className="space-y-3 rounded-lg border border-border p-3"
          >
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Meditation, ERP practice..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="erp">ERP Practice</SelectItem>
                  <SelectItem value="mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="self-care">Self-Care</SelectItem>
                  <SelectItem value="therapy">Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" size="sm" disabled={adding}>
              {adding ? "Adding..." : "Add Habit"}
            </Button>
          </form>
        )}

        {habits.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No habits yet. Click &quot;Add&quot; to create your first habit!
          </p>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <Checkbox
                  checked={habit.completedToday}
                  onCheckedChange={(checked) =>
                    toggleHabit(habit.id, checked as boolean)
                  }
                />
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      habit.completedToday
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {habit.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {habit.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
