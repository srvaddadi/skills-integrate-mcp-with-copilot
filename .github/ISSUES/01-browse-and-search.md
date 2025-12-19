Title: Add advanced browsing, search and categories

Description:
Implement advanced browsing and search capabilities so users can filter and discover activities by category, date, availability and keywords. Replace the single `/activities` listing with paginated, searchable endpoints and a UI for filters and category pages.

Acceptance criteria:
- Backend: paginated `/activities` endpoint with query parameters: `q`, `category`, `page`, `size`, `sort`.
- Frontend: a results page with search box, category list, filters, and pagination controls.
- Unit tests for backend query parsing and frontend search component.

Labels: enhancement, frontend, backend
Estimate: M
