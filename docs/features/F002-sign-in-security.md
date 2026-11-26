# F002 — Sign-in & account security

**Status:** Planned — nothing built (verified: no rate limiting, CSRF tokens, revocation, verification or reset in `src/`).

## Purpose

The app stores OCD symptom logs — health data under GDPR art. 9. Today anyone can register any email, passwords can be brute-forced, a stolen cookie works for 7 days, and a forgotten password means a lost account. This epic closes those holes.

## Source

`docs/PLAN.md` → Security Hardening (Rate Limiting, CSRF Protection, Token Rotation, Email Verification) and Data & Backend → Password Reset Flow.

## Scope

1. Brute-force protection on login/register.
2. CSRF protection on state-changing requests.
3. Session revocation (logout everywhere, short-lived access).
4. Email ownership verification at sign-up.
5. Password reset / account recovery.
6. Replace the Gravatar avatar in the header (fleet rule D-0c5b2f) with initials.

## The deciding open question

**Sign-in via BID (`@broberg/sso`, id.broberg.ai) or keep the app's own JWT auth?**

- **A — BID (recommended).** Fleet rules D-854104 / D-a6f2e5 say one login on id.broberg.ai, labelled «Log ind». BID already does verification, recovery, passkeys, 2FA and rate limiting, so items 1, 3, 4, 5 become «adopt BID» + migrate existing users; the app keeps only its own session cookie + CSRF.
- **B — Own auth.** Keep `src/lib/auth.ts`, add rate limiting, refresh tokens/server sessions, verification + reset mails via `@broberg/mail` + `@broberg/mail-core` codeMail. More code to own and secure.

Stories are cut only after the owner answers (journey `sign-in`).

## Reuse (Discovery check 27 Nov 2026)

| Capability | Package | Decision |
|---|---|---|
| Central login | `@broberg/sso` 0.29 | Reuse if option A |
| Email+password, magic link, 2FA | `@broberg/auth` 0.7 | Reuse if option B |
| Verification / reset mail | `@broberg/mail` + `@broberg/mail-core` | Reuse if option B |
| Avatar initials | `@broberg/gravatar` (initials fallback only) | Initials only, no Gravatar fetch |

## Non-goals

Roles/organisations (no multi-user sharing yet — see F003 therapist export).

## Stories

To be cut from the approved `sign-in` journey (Branch B, Phase 4) plus technical stories (CSRF, session store).
