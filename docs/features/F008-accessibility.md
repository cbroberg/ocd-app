# F008 — Accessibility: screen readers, keyboard, high contrast

**Status:** Planned — no audit done. Radix primitives give a partial baseline; sliders, charts and custom cards are unaudited.

## Purpose

Anxiety disorders often coexist with other conditions; the app must work for users on screen readers, keyboards and high-contrast settings.

## Source

`docs/PLAN.md` → Accessibility.

## Scope

1. Audit every page and component (labels, roles, focus order, contrast) and fix findings.
2. Exercise logging flow fully keyboard-drivable (open, set sliders, save with Cmd/Ctrl+Enter, Escape cancels).
3. High-contrast theme as a third option next to light/dark.
4. Charts get a text/table alternative.
5. Replace any native `<select>` / range / date inputs with `components/ui/` equivalents (D-8ffe29).

## Open questions

- **Target level:** A) WCAG 2.2 AA, B) AA + selected AAA (contrast).

## Reuse (Discovery check 27 Nov 2026)

`@broberg/theme` (tokens, light/dark/system) is Stack B oriented; the app is Stack A with its own theme toggle. Decision: keep current theme toggle, add a high-contrast token set; revisit `@broberg/theme` only if the owner wants fleet-wide look.

## Stories

Technical audit stories per surface (auth, dashboard, tracking, exercises, progress) + the keyboard logging flow from the `practice-an-exercise` journey.
