"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function SymptomLogger() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [anxiety, setAnxiety] = useState([5]);
  const [resistance, setResistance] = useState([5]);
  const [mood, setMood] = useState("neutral");
  const [thoughtFreq, setThoughtFreq] = useState("none");
  const [compulsionCount, setCompulsionCount] = useState("");
  const [compulsionDuration, setCompulsionDuration] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          anxietyLevel: anxiety[0],
          compulsionCount: parseInt(compulsionCount) || 0,
          compulsionDuration: parseInt(compulsionDuration) || 0,
          intrusiveThoughtFrequency: thoughtFreq,
          resistanceLevel: resistance[0],
          mood,
          notes: notes || undefined,
        }),
      });

      if (res.ok) {
        toast.success("Symptoms logged successfully!");
        router.refresh();
        setCompulsionCount("");
        setCompulsionDuration("");
        setNotes("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to log symptoms");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Symptoms</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Anxiety Level: {anxiety[0]}/10</Label>
            <Slider
              value={anxiety}
              onValueChange={setAnxiety}
              max={10}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Calm</span>
              <span>Severe</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Resistance Level: {resistance[0]}/10</Label>
            <Slider
              value={resistance}
              onValueChange={setResistance}
              max={10}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>No resistance</span>
              <span>Full resistance</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Compulsion Count</Label>
              <Input
                type="number"
                min="0"
                value={compulsionCount}
                onChange={(e) => setCompulsionCount(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                min="0"
                value={compulsionDuration}
                onChange={(e) => setCompulsionDuration(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Mood</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="great">Great</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="bad">Bad</SelectItem>
                  <SelectItem value="terrible">Terrible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Intrusive Thoughts</Label>
              <Select value={thoughtFreq} onValueChange={setThoughtFreq}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="occasional">Occasional</SelectItem>
                  <SelectItem value="frequent">Frequent</SelectItem>
                  <SelectItem value="constant">Constant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today?"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Log Symptoms"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
