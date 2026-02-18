# OCD Management App — Claude Instructions

## Overview

An ERP (Exposure and Response Prevention) therapy companion app for OCD management. Users track symptoms, build habits, practice exercises, and monitor progress.

## Tech Stack

- **Next.js 16** with App Router and React 19
- **SQLite** via better-sqlite3 + **Drizzle ORM**
- **Auth**: Custom JWT (jose + bcryptjs), stored in httpOnly cookie `ocd-session`
- **UI**: Tailwind CSS 4, Radix UI, shadcn/ui components, Recharts
- **Validation**: Zod
- **Toast**: sonner (Toaster mounted in `src/app/providers.tsx`)
- **Dev port**: 6500

## Key Commands

```bash
npm run dev          # Start dev server on port 6500
npm run build        # Production build
npm run db:push      # Push schema changes to SQLite
npm run db:seed      # Seed system exercises
npx tsc --noEmit     # Type-check without emitting
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login & register pages
│   ├── (protected)/         # Dashboard, tracking, exercises, progress
│   │   └── layout.tsx       # Auth guard — redirects if no session
│   └── api/
│       ├── auth/            # register, login, logout, me
│       ├── habits/          # CRUD + [id] route
│       ├── symptoms/        # CRUD + [id] route
│       ├── exercises/       # CRUD + [id] route
│       └── progress/        # CRUD + [id] + stats route
├── components/
│   ├── ui/                  # shadcn/ui primitives (Badge, Button, Card, Dialog, Input, Label, Select, Slider, etc.)
│   ├── exercises/           # ExerciseList, ExerciseCard, ExerciseForm, LogExerciseDialog, DifficultyBadge
│   ├── tracking/            # SymptomLogger, HabitTracker
│   └── dashboard/           # QuickCheckin, charts
├── drizzle/
│   ├── schema.ts            # All tables: users, habits, symptoms, exercises, progressLogs
│   ├── index.ts             # DB connection (WAL mode, foreign keys ON)
│   └── seed.ts              # 15 system ERP exercises
└── lib/
    ├── auth.ts              # JWT create/verify, password hash, session cookies
    ├── validations.ts       # Zod schemas for all entities
    └── utils.ts             # cn() helper
```

## Database Tables

- **users** — id, email, name, passwordHash
- **habits** — userId, name, description, category, targetFrequency, isActive
- **symptoms** — userId, date, anxietyLevel, compulsionCount, compulsionDuration, intrusiveThoughtFrequency, resistanceLevel, mood, notes
- **exercises** — userId (null for system), title, description, category, difficulty, estimatedMinutes, instructions, isSystemExercise
- **progress_logs** — userId, habitId?, exerciseId?, date, completed, anxietyBefore?, anxietyAfter?, durationMinutes?, notes

## Conventions

- All data is scoped to the authenticated user's `userId`
- Server components fetch data directly via Drizzle; client components call `/api/*` endpoints
- Use `toast` from `sonner` for user feedback
- `"use client"` only on components that need interactivity
- Exercises can be system-provided (`isSystemExercise: true`, `userId: null`) or user-created
- Exercise completion logging tracks anxiety before/after with 0-10 sliders

## Auth

- JWT_SECRET **must** be set as an environment variable (app crashes on startup if missing)
- Tokens expire after 7 days
- Cookie: httpOnly, secure in production, sameSite lax
- All protected routes use `getSession()` from `@/lib/auth`

## Environment Variables

- `JWT_SECRET` — **Required**. Signing key for JWT tokens.
- `DATABASE_URL` — Path to SQLite file. Defaults to `./sqlite.db`.
