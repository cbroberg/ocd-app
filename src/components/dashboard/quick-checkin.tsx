"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function QuickCheckin() {
  const router = useRouter();
  const [anxiety, setAnxiety] = useState([5]);
  const [mood, setMood] = useState("neutral");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          anxietyLevel: anxiety[0],
          mood,
          compulsionCount: 0,
          compulsionDuration: 0,
        }),
      });

      if (res.ok) {
        toast.success("Check-in recorded!");
        router.refresh();
      } else {
        toast.error("Failed to save check-in");
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
        <CardTitle className="text-lg">Quick Check-in</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Anxiety Level: {anxiety[0]}/10</Label>
          <Slider
            value={anxiety}
            onValueChange={setAnxiety}
            max={10}
            step={1}
            className="w-full"
          />
        </div>
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
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Check-in"}
        </Button>
      </CardContent>
    </Card>
  );
}
