# F009 — Ship pipeline: tests, CI, EU deploy, error monitoring

**Status:** Planned. `.github/workflows/` holds only the fleet `secret-gate.yml` and `security.yml`; no build/test workflow, no `fly.toml`/`Dockerfile`, 0 test files, no error reporting.

## Purpose

The app runs only on a laptop today. Nothing else in the plan (reminders, backups, users) can happen until it has a tested, monitored home.

## Source

`docs/PLAN.md` → Infrastructure → Deployment, Error Monitoring, Testing.

## Scope

1. Test runner + API route integration tests (auth, symptoms, habits, exercises, progress — incl. cross-user isolation).
2. Lens e2e manuscript: register → log exercise → see it on progress.
3. CI workflow: lint, `tsc --noEmit`, build, tests — blocks merge/deploy when red.
4. Fly.io app in `arn` with a persistent volume (or Postgres — see F003), secrets from the cardmem vault, deploy via `--remote-only`.
5. `@upmetrics/sdk` for server + client errors; repo enrolled.

## Open questions

- **Domain:** which hostname does the app live on?
- **Database engine** (shared with F003): SQLite on a Fly volume vs PostgreSQL.

## Reuse (Discovery check 27 Nov 2026)

| Capability | Package | Decision |
|---|---|---|
| Error monitoring | `@upmetrics/sdk` 0.11 | Reuse (replaces PLAN.md's «Sentry») |
| Deploy | `@broberg/deploy-core` / fleet `ship` skill | Reuse |
| Logging | `@broberg/logger` 0.3 | Consider |
| E2E | Cardmem Lens | Reuse |

## Stories

Technical stories (no journey): test harness, isolation tests, CI workflow, Fly deploy, Upmetrics. Should run first — F003 backups and F006 reminders depend on it.
