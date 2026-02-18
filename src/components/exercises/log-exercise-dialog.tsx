"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ClipboardCheck, ChevronDown } from "lucide-react";

interface LogExerciseDialogProps {
  exerciseId: number;
  exerciseTitle: string;
  onLogged: () => void;
}

export function LogExerciseDialog({
  exerciseId,
  exerciseTitle,
  onLogged,
}: LogExerciseDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [anxietyBefore, setAnxietyBefore] = useState(5);
  const [anxietyAfter, setAnxietyAfter] = useState(5);
  const [showExtras, setShowExtras] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setStep(1);
    setAnxietyBefore(5);
    setAnxietyAfter(5);
    setShowExtras(false);
    setDurationMinutes("");
    setNotes("");
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId,
          date: new Date().toISOString().split("T")[0],
          completed: true,
          anxietyBefore,
          anxietyAfter,
          ...(durationMinutes ? { durationMinutes: Number(durationMinutes) } : {}),
          ...(notes ? { notes } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to log exercise");
      }

      toast.success("Exercise logged!");
      setOpen(false);
      reset();
      onLogged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function anxietyLabel(value: number) {
    if (value <= 2) return "Low";
    if (value <= 5) return "Moderate";
    if (value <= 8) return "High";
    return "Severe";
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full">
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Log Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">
            {step === 1 ? "Anxiety Before" : "Anxiety After"}
          </DialogTitle>
          <p className="text-xs text-muted-foreground">{exerciseTitle}</p>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6 py-2">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>How anxious do you feel right now?</span>
                <span className="font-semibold tabular-nums">
                  {anxietyBefore}/10
                </span>
              </div>
              <Slider
                value={[anxietyBefore]}
                onValueChange={([v]) => setAnxietyBefore(v)}
                min={0}
                max={10}
                step={1}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground text-center">
                {anxietyLabel(anxietyBefore)}
              </p>
            </div>
            <Button className="w-full" onClick={() => setStep(2)}>
              Next
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-2">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>How anxious do you feel now?</span>
                <span className="font-semibold tabular-nums">
                  {anxietyAfter}/10
                </span>
              </div>
              <Slider
                value={[anxietyAfter]}
                onValueChange={([v]) => setAnxietyAfter(v)}
                min={0}
                max={10}
                step={1}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground text-center">
                {anxietyLabel(anxietyAfter)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowExtras(!showExtras)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown
                className={`h-3 w-3 transition-transform ${showExtras ? "rotate-180" : ""}`}
              />
              Add duration & notes
            </button>

            {showExtras && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="duration" className="text-xs">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min={0}
                    placeholder="e.g. 15"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="notes" className="text-xs">
                    Notes
                  </Label>
                  <textarea
                    id="notes"
                    rows={2}
                    placeholder="How did it go?"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
