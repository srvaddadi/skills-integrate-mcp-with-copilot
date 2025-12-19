Title: Add favorites and ratings/reviews

Description:
Allow authenticated users to mark activities as favorites and submit ratings/reviews. Provide endpoints to create/delete favorites and to create/list ratings. Show aggregated rating on activity cards.

Acceptance criteria:
- Backend endpoints: `POST /favorites`, `DELETE /favorites/{activityId}`, `POST /activities/{id}/ratings`, `GET /activities/{id}/ratings`.
- Frontend: favorite button on cards, ratings UI, and average rating displayed.
- Minimal validation and tests for endpoints.

Labels: enhancement, frontend, backend
Estimate: M
