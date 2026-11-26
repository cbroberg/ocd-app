# F004 — Progress insights: trends, streaks, correlations

**Status:** Planned. Today: `/api/progress/stats` + `anxiety-chart`, `habit-completion-chart`, `stats-cards`, a dashboard `habit-streak-card`. Missing: per-exercise trends, weekly/monthly views, streak calendar, correlation.

## Purpose

ERP works through repeated exposure where anxiety drops over time. Users stay motivated when they can see that drop. This epic turns logged data into that picture.

## Source

`docs/PLAN.md` → Progress Page Enhancements; Habit Tracking → Visual streak calendar; Symptom Tracking → Correlate symptom trends with exercise frequency.

## Scope

1. Per-exercise view: anxiety before vs after across completions.
2. Weekly and monthly summary views.
3. Habit streaks (current/longest) + contribution-style calendar.
4. Symptom trend vs exercise frequency on one timeline.
5. Habit completion directly from the dashboard (PLAN.md Habit Tracking).

## Open questions

- **Correlation display:** A) simple overlay chart (no statistics), B) a computed correlation number with a plain-language explanation. B risks reading as a medical claim.

## Reuse (Discovery check 27 Nov 2026)

No shared charting package in the inventory; keep Recharts (already a dependency). Follow the `dataviz` skill for colours/marks.

## Stories

Cut from the approved `see-my-progress` and `daily-check-in` journeys.
