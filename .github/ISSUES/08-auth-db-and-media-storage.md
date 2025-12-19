Title: Add persistent storage, auth integration and media storage

Description:
Replace the in-memory activities store with a database (Postgres recommended), add migrations, and integrate media storage (S3/MinIO). Wire authentication to secure endpoints.

Acceptance criteria:
- DB schema and migrations for activities, users, providers, favorites, ratings, drafts.
- Media uploading to configured storage and serving URLs.
- Secure endpoints with auth and role checks.

Labels: backend, infra, auth, media
Estimate: XL
