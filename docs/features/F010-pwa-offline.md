# F010 — Installable app (PWA) with offline logging

**Status:** Planned — no manifest, no service worker.

## Purpose

Compulsions and anxiety spikes happen anywhere. Logging must be one tap from the home screen and work without signal. On iPhone, web push (F006) also requires the app to be installed.

## Source

`docs/PLAN.md` → Infrastructure → Mobile App (PWA setup with service worker for offline support and install prompt).

## Scope

1. Manifest + icons + install prompt.
2. Service worker caching the app shell.
3. Offline queue for quick check-ins and exercise logs, synced on reconnect, unsynced entries marked.
4. Clear cached data on logout.

## Open questions

- **Offline scope:** A) check-ins only, B) all logging (symptoms, habits, exercises).

## Reuse (Discovery check 27 Nov 2026)

| Capability | Package | Decision |
|---|---|---|
| PWA | `@broberg/pwa` 0.9 | Reuse |
| Device stats | `@broberg/device-stats` 0.5 | Optional |

## Dependencies

F009 (must be deployed over HTTPS).

## Stories

Cut from the approved `daily-check-in` journey (offline state) + technical PWA setup story.
