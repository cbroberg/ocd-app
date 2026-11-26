# F006 — Reminders & weekly summaries

**Status:** Planned — no notification, mail or scheduling code exists.

## Purpose

ERP only works with regular practice. Gentle reminders at user-chosen times, and a weekly look back, keep the habit alive.

## Source

`docs/PLAN.md` → Habit Tracking → Reminders / notification support; Symptom Tracking → Weekly summary emails or push notifications.

## Scope

1. Per-habit reminder: time of day + days of week.
2. Weekly summary (mail and/or push): check-ins, exercises done, anxiety trend in words.
3. Settings page to choose channel and switch everything off.
4. Unsubscribe that works without login and is a POST confirmation, not a GET action.

## Open questions

- **Channels:** A) web push only (needs F010 PWA install on iOS), B) mail only, C) both, user chooses.
- **Mail sender domain:** which domain sends? (needed for `@broberg/mail` + the `mail` epic templates).

## Reuse (Discovery check 27 Nov 2026)

| Capability | Package | Decision |
|---|---|---|
| Send mail | `@broberg/mail` 0.26 | Reuse |
| Mail layout | `@broberg/mail-templates` / project mail templates (`mail` epic) | Reuse |
| Web push | `@broberg/webpush` 0.9 | Reuse |
| Schedules | `@broberg/cron` 0.4 | Reuse |
| In-app list | `@broberg/notifications` 0.6 | Consider |

## Dependencies

Depends on F009 (deployed somewhere a cron can reach). Push on iPhone depends on F010.

## Stories

Cut from the approved `reminders` journey.
