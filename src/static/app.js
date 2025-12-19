document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    const q = document.getElementById('search-q').value;
    const category = document.getElementById('search-category').value;
    const pageInfo = window._activity_page || { page: 1, size: 5 };
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    params.set('page', pageInfo.page);
    params.set('size', pageInfo.size);
    const url = '/activities?' + params.toString();
    try {
      const response = await fetch(url);
      const activities = await response.json();
      // support legacy format
      const items = activities.items || Object.entries(activities).map(([name, details]) => ({ name, ...details }));
      // store pagination info
      window._activity_page = { page: activities.page || 1, size: activities.size || 5, total: activities.total || items.length };

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      items.forEach((details) => {
        const name = details.name;
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - (details.participants || []).length;

        const participantsHTML = (details.participants || []).length > 0
          ? `<div class="participants-section">
              <h5>Participants:</h5>
              <ul class="participants-list">
                ${(details.participants || []).map((email) => `<li><span class="participant-email">${email}</span><button class="delete-btn" data-activity="${name}" data-email="${email}">❌</button></li>`).join("")}
              </ul>
            </div>`
          : `<p><em>No participants yet</em></p>`;

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description || ''}</p>
          <p><strong>Schedule:</strong> ${details.schedule || ''}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <div class="participants-container">
            ${participantsHTML}
          </div>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown if not present
        if (![...activitySelect.options].some(o => o.value === name)) {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          activitySelect.appendChild(option);
        }
      });

      // Update pagination controls
      const pageInfo = window._activity_page || { page: 1, size: 5, total: 0 };
      const pageInfoSpan = document.getElementById('page-info');
      const paginationControls = document.getElementById('pagination-controls');
      if (pageInfoSpan) pageInfoSpan.textContent = `Page ${pageInfo.page} of ${Math.max(1, Math.ceil((pageInfo.total||0)/pageInfo.size))}`;
      if (paginationControls) paginationControls.classList.remove('hidden');
      document.getElementById('prev-page').disabled = pageInfo.page <= 1;
      document.getElementById('next-page').disabled = pageInfo.page >= Math.ceil((pageInfo.total||0)/pageInfo.size);

      // Add event listeners to delete buttons
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", handleUnregister);
      });
    } catch (error) {
      activitiesList.innerHTML =
        "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Fetch categories and populate select
  async function fetchCategories() {
    try {
      const resp = await fetch('/categories');
      const cats = await resp.json();
      const catSelect = document.getElementById('search-category');
      cats.forEach(c => {
        const opt = document.createElement('option'); opt.value = c; opt.textContent = c; catSelect.appendChild(opt);
      });
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  }

  // Handle unregister functionality
  async function handleUnregister(event) {
    const button = event.target;
    const activity = button.getAttribute("data-activity");
    const email = button.getAttribute("data-email");

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(
          activity
        )}/unregister?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";

        // Refresh activities list to show updated participants
        fetchActivities();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to unregister. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error unregistering:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(
          activity
        )}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();

        // Refresh activities list to show updated participants
          fetchActivities();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  // Setup search controls
  document.getElementById('search-btn').addEventListener('click', () => { window._activity_page = { page: 1, size: window._activity_page?.size || 5 }; fetchActivities(); });
  document.getElementById('prev-page').addEventListener('click', () => { window._activity_page.page = Math.max(1, window._activity_page.page - 1); fetchActivities(); });
  document.getElementById('next-page').addEventListener('click', () => { window._activity_page.page = window._activity_page.page + 1; fetchActivities(); });
  fetchCategories();
  fetchActivities();
});
