// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


// fetch('http://localhost:3000/factcheck', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ query: searchTerm })
// })

function searchFunction(searchTerm) {
  console.log(`Searching for "${searchTerm}"...`);

  if (!searchTerm.trim()) return;

  fetch('http://localhost:3000/api/factcheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ claim: searchTerm })
  })
    .then(res => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(data => {
      console.log("Fact check data:", data);
      displayResults(data.claims || []);
    })
    .catch(err => {
      console.error("Error communicating with backend:", err);
      displayError("Backend error occurred.");
    });
}




function displayResults(claims) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!claims.length) {
    container.innerHTML = "<p>No claims found.</p>";
    return;
  }

  claims.forEach(claim => {
    const claimReview = claim.claimReview?.[0];
    container.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${claim.text}</h5>
          <p class="card-text"><strong>Claimed by:</strong> ${claim.claimant || "Unknown"}</p>
          <p class="card-text"><strong>Rating:</strong> ${claimReview?.textualRating || "No rating"}</p>
          <a href="${claimReview?.url}" target="_blank" class="btn btn-sm btn-outline-primary">Read More</a>
        </div>
      </div>
    `;
  });
}

function displayError(message) {
  const container = document.getElementById("results");
  container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

// Set up event listeners
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".searchBtn");
  const input = document.querySelector(".inputSearch");

  btn.addEventListener("click", () => {
    searchFunction(input.value);
  });

  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchFunction(input.value);
    }
  });
});
