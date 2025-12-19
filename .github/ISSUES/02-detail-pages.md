Title: Add dedicated activity detail pages

Description:
Create per-activity detail pages showing full description, schedules, images, instructors/judges, reviews and ratings. Provide a REST endpoint for single-activity details and media attachments.

Acceptance criteria:
- Backend: `/activities/{id}` endpoint returning detailed activity data including media URLs.
- Frontend: detail view component with image gallery, participants list, and reviews.
- Support uploading and serving images (temporary storage acceptable for MVP).

Labels: enhancement, frontend, backend, media
Estimate: M
