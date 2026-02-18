# OCD Management App

A personal tool for managing OCD through Exposure and Response Prevention (ERP). Track symptoms, build healthy habits, practice exercises, and monitor your progress over time — all in one place.

## What It Does

OCD is typically treated with ERP therapy, where you gradually expose yourself to anxiety triggers while resisting compulsions. This app supports that process by giving you a structured way to:

- **Track daily symptoms** — Log anxiety levels, compulsion counts, intrusive thought frequency, resistance levels, and mood. Over time this builds a picture of patterns and progress.
- **Manage habits** — Create and track daily or weekly habits that support your recovery (e.g. mindfulness, journaling, sleep hygiene).
- **Practice ERP exercises** — Browse a library of system-provided exercises across categories like contamination, checking, symmetry, and intrusive thoughts. Create your own custom exercises too.
- **Log exercise completions** — Record when you do an exercise with before/after anxiety ratings. See how many times you've completed each exercise at a glance.
- **View progress** — Charts and stats show your trends over time, helping you and your therapist see what's working.

## Multi-User

Each user registers with their own account. All data — symptoms, habits, exercises, and progress logs — is fully isolated per user.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Database:** SQLite via better-sqlite3 + Drizzle ORM
- **Auth:** JWT sessions with bcrypt password hashing
- **UI:** Tailwind CSS, Radix UI primitives, shadcn/ui components, Recharts
- **Validation:** Zod

## Getting Started

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Seed with sample exercises
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to register and start using the app.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login & register pages
│   ├── (protected)/     # Dashboard, tracking, exercises, progress
│   └── api/             # REST endpoints for all resources
├── components/          # UI components organized by feature
├── drizzle/             # Database schema, migrations, seed data
└── lib/                 # Auth helpers, validations, utilities
```
