# F001 — Core ERP companion (shipped baseline)

**Status:** Done — shipped before cardmem adoption (commits `93b2bcb` → `26cb6a8`).

## Purpose

A fixed reference point for everything `docs/PLAN.md` lists as missing. Every later epic (F002–F010) changes or extends something described here.

## What exists today (verified in code, 27 Nov 2026)

| Area | Where | What it does |
|---|---|---|
| Auth | `src/app/api/auth/*`, `src/lib/auth.ts`, `src/proxy.ts` | Email + password register/login, JWT (jose) in httpOnly cookie `ocd-session`, 7-day expiry, bcrypt hashes. `JWT_SECRET` required. |
| Symptoms | `src/app/api/symptoms`, `components/tracking/symptom-logger.tsx` | Daily log: anxiety 0–10, compulsion count/duration, intrusive-thought frequency, resistance, mood, notes. |
| Habits | `src/app/api/habits`, `components/tracking/habit-tracker.tsx` | User habits with category and target frequency; completion via progress logs. |
| Exercises | `src/app/api/exercises`, `components/exercises/*`, `src/drizzle/seed.ts` | 15 seeded system ERP exercises + user-created ones; log completion with anxiety before/after sliders. |
| Progress | `src/app/api/progress/*`, `components/progress/*` | Logs, stats endpoint, anxiety + habit-completion charts (Recharts), date range. |
| Dashboard | `src/app/(protected)/dashboard`, `components/dashboard/*` | Quick check-in, daily summary, habit streak card, recent activity. |
| Shell | `components/layout/*`, `theme-toggle.tsx` | Sidebar, mobile nav, header with Gravatar, light/dark toggle. |

Stack: Next.js 16, React 19, SQLite (better-sqlite3) + Drizzle, Tailwind 4, shadcn/ui, Zod, sonner.

## Known gaps (owned by later epics, not this one)

- No tests, no CI build, no deployment, no error monitoring → F009.
- No `data-testid` anchors anywhere (0 in `src/`) → Lens foundry (proposed).
- Gravatar in header conflicts with fleet rule D-0c5b2f (no Gravatar) → F002.
- Native `<select>`/range inputs may conflict with D-8ffe29 → F008.

## Reuse

Not applicable — documents existing code. Reuse decisions are made per later epic.

## Stories

None. This epic records shipped work; it carries no pickable stories.
