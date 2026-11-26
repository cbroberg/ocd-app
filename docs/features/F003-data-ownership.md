# F003 — Data ownership: export, backups, safe seeding

**Status:** Planned — no `/api/export`, no backup job; `src/drizzle/seed.ts` inserts unconditionally (verified: running `db:seed` twice duplicates the 15 system exercises).

## Purpose

GDPR gives users the right to a copy of their data, and a therapy app's history is worthless if one disk failure deletes it. Users also want to show their logs to a therapist.

## Source

`docs/PLAN.md` → Data Export, Database Backups, Seed Idempotency; Symptom Tracking → Export symptom data for sharing with a therapist.

## Scope

1. `GET /api/export?format=csv|json` — all of the user's symptoms, habits, exercises, progress logs.
2. A therapist summary (printable/PDF-friendly page or file) for a chosen date range.
3. Nightly backup of the database, read back and checksum-verified, stored in the EU.
4. Idempotent seed: system exercises upserted by a stable key, never duplicated.

## Open questions

- **Database engine:** stay on SQLite (file on a Fly volume) or move to PostgreSQL (D-56197d: own storage on plain PostgreSQL)? Affects how backups work. Options: A) SQLite + `@broberg/backup` file snapshots, B) PostgreSQL + managed/`@broberg/backup` dumps.
- **Therapist share format:** A) downloadable PDF/print page the user hands over, B) time-limited share link the therapist opens.

## Reuse (Discovery check 27 Nov 2026)

| Capability | Package | Decision |
|---|---|---|
| Backups | `@broberg/backup` 0.4 | Reuse |
| Object storage | `@broberg/s3` / R2 EU | Reuse for backup target |
| Scheduling | `@broberg/cron` 0.4 | Reuse for nightly job |
| Export | — | Build (app-specific shape) |

## Stories

User-facing stories from the approved `export-for-therapist` journey; technical stories: seed idempotency, backup job + restore test.
