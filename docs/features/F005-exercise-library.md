# F005 — Exercise library improvements

**Status:** Planned. `src/app/api/exercises/[id]/route.ts` exists (API side of update/delete), but the UI (`exercise-card`, `exercise-list`) offers no edit/delete, search covers titles only, and there is no progression logic.

## Purpose

ERP is a graded ladder: start easier, move up as anxiety habituates. The library should let users maintain their own ladder and nudge them to the next rung.

## Source

`docs/PLAN.md` → Exercise Improvements.

## Scope

1. Edit and delete user-created exercises from the UI (system exercises read-only).
2. Search/filter by title, category, difficulty and instruction text.
3. Suggested progression: after N completions where anxiety-after is low, suggest an exercise one difficulty step up in the same category.

## Open questions

- **Delete with history:** A) soft-delete (hide, keep logs), B) block delete when logs exist.
- **Progression threshold:** A) fixed (e.g. 3 completions with anxiety-after ≤ 3), B) user-configurable.

## Reuse (Discovery check 27 Nov 2026)

Nothing cross-cutting; app-specific. Dialogs/controls from `components/ui/` (D-8ffe29).

## Stories

Cut from the approved `practice-an-exercise` journey.
