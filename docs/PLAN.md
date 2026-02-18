# Roadmap & Missing Pieces

What the app has today and what's needed to make it production-ready or more useful.

---

## Security Hardening

### Rate Limiting
- Login and register endpoints have no rate limiting
- A brute-force attack could try thousands of passwords
- **Fix**: Add middleware-level rate limiting (e.g. per-IP, 5 attempts/minute on auth routes)

### CSRF Protection
- `sameSite: lax` cookies help but don't fully prevent cross-origin form POSTs
- **Fix**: Add CSRF tokens to state-mutating requests, or switch all mutations to fetch-only (no plain form submissions)

### Token Rotation
- JWTs are valid for 7 days with no revocation mechanism
- A stolen token gives full access until expiry
- **Fix**: Shorter access token (15 min) + refresh token, or server-side session store with revocation

### Email Verification
- Anyone can register with any email address
- No way to verify ownership or do password resets
- **Fix**: Send verification email on register, require confirmation before full access

---

## Data & Backend

### Password Reset Flow
- No "forgot password" feature exists
- Users who forget their password are locked out
- **Fix**: Email-based password reset with time-limited tokens

### Data Export
- Users have no way to export their data (symptoms, progress, habits)
- **Fix**: Add a CSV/JSON export endpoint under `/api/export`

### Database Backups
- SQLite file has no backup strategy
- **Fix**: Scheduled file-level backups or switch to a managed database for production

### Seed Idempotency
- Running `npm run db:seed` multiple times duplicates exercises
- **Fix**: Check for existing system exercises before inserting, or use upsert

---

## Features

### Progress Page Enhancements
- Show exercise-specific progress (anxiety before/after trends per exercise)
- Weekly/monthly summary views
- Streak tracking for habits

### Exercise Improvements
- Edit and delete user-created exercises
- Search/filter within exercise instructions
- Suggested difficulty progression (auto-suggest harder exercises after repeated completions)

### Symptom Tracking
- Weekly summary emails or push notifications
- Correlate symptom trends with exercise frequency
- Export symptom data for sharing with a therapist

### Habit Tracking
- Visual streak calendar (GitHub-style contribution graph)
- Reminders / notification support
- Habit completion directly from dashboard

### Onboarding
- Guided first-use experience explaining ERP and how to use the app
- Suggested starter exercises based on OCD subtype selection

### Accessibility
- Audit all components for screen reader support
- Keyboard navigation through exercise logging flow
- High-contrast theme option

---

## Infrastructure

### Deployment
- No CI/CD pipeline configured
- **Fix**: GitHub Actions for lint + type-check + build on PR, auto-deploy to Vercel/Fly.io

### Error Monitoring
- No error tracking in production
- **Fix**: Add Sentry or similar for runtime error reporting

### Testing
- No tests exist (unit, integration, or e2e)
- **Fix**: Start with API route integration tests, then add e2e tests for critical flows (register → log exercise → check progress)

### Mobile App
- Currently web-only, works on mobile browsers but no native features
- **Consider**: PWA setup with service worker for offline support and install prompt
