const form = document.querySelector("form");
const reviewList = document.createElement("div");
reviewList.className = "review-list";
document.querySelector(".review-section").appendChild(reviewList);


form.addEventListener("submit",async (e) => {
    e.preventDefault();

    const rating = form.rating.value;
    const reviewText = form.review.value.trim();

    if(!rating || !reviewText) {
       alert("Please select a rating and write a review.");
       return;
    }

    const newReview = {
    rating: parseInt(rating),
    text: reviewText,
    date: new Date().toISOString()
  };

    try {
    const res = await fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview)
    });

    if (res.ok) {
      form.reset();
      loadReviews(); // Refresh list
    } else {
      alert("Failed to submit review.");
    }
  } catch (err) {
    console.error("Error submitting review:", err);
  }
});



async function loadReviews() {
    try {
        const res = await fetch("http://localhost:3001/reviews");
    const reviews = await res.json();

    reviewList.innerHTML = ``;
    reviews.reverse().forEach((review) => {
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
        <div class="stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
        <p class="text">${review.text}</p>
        <p class="date">${new Date(review.date).toLocaleDateString()}</p>
        <button class="delete-btn" data-id="${review.id}">Delete</button>


      `;

      reviewList.appendChild(card);

    });


    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            const confirmDel = confirm("Are you sure to delete your review");
            if(!confirmDel) {
                return;
            }
            try {
            const res = await fetch(`http://localhost:3001/reviews/${id}`, {
            method: "DELETE"
          });
          
          if (res.ok) {
            loadReviews(); // Refresh list
          } else {
            alert("Failed to delete review.");
          }
        } catch (err) {
          console.error("Error deleting review:", err);
        }
 
        });
    });
    } catch(err) {
        console.error("error loading reviews",err);
    }
}

loadReviews();


