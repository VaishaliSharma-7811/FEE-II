document.addEventListener("DOMContentLoaded", ()=> {
    const params = new URLSearchParams(window.location.search);
    const listingId = params.get("id");

    if(!listingId) {
        alert("No listing ID provided in URL.");
        return;
    }

    fetch(`http://localhost:3001/homes/${listingId}`)
    .then((res)=> {
        if(!res.ok) throw new Error("Listing not found");
        return res.json();
    })
    .then((listing)=> {
        renderListing(listing);
    })
    .catch((err)=> {
        console.log(err);
        document.querySelector(".property-container").innerHTML = `
        <p style="color: red text-align: center;" >Unable to load listing details </p>`;
    });
});




function renderListing(listing) {
  const container = document.querySelector(".property-container");
  const imageUrl =
    listing.image && listing.image.trim() !== ""
      ? listing.image
      : "https://images.unsplash.com/photo-1505691938895-1758d7feb511";

  container.innerHTML = `
    <div class="property-card">
      <img src="${imageUrl}" alt="${listing.title}">
      <div class="property-info">
        <h2>${listing.title}</h2>
        <p class="details">${listing.description}</p>
        <p class="price">₹${listing.price}</p>
        <p class="location">${listing.location}</p>
        <div style="margin-top: 1rem;">
          <a href="payment.html?id=${listing.id}" class="reserve-btn">Book</a>
          <a href="#" class="reserve-btn delete-btn" id="deleteBtn" style="margin-left: 10px;">Delete</a>
        </div>
      </div>
    </div>
  `;

  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const confirmDelete = confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3001/homes/${listing.id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete listing");
        alert("Listing deleted successfully.");
        window.location.href = "index.html";
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Something went wrong while deleting.");
      });
  });
}