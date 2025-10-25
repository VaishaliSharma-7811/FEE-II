async function fetchHomes() {
    try {
        const res = await fetch("http://localhost:3001/homes");
        const homes = await res.json();

        const container = document.getElementById("homeListings");
        


        homes.forEach(home => {
            const card = document.createElement("div");
            card.className = "home-card";
            const imageUrl = home.image.trim() ? home.image : 'https://images.unsplash.com/photo-1505691938895-1758d7feb511';
            card.innerHTML = `
            <a href="show.html?id=${home.id}" style= "text-decoration: none; color: inherit;">
            <img src= "${imageUrl}" alt="${home.title}">
            <div class="home-info">
             <h3>${home.title}</h3>
          <p>₹${home.price}</p>
          <p class="reviews">⭐⭐⭐⭐ (120 reviews)</p>
         
        </div>
         </a>
         `;
        container.appendChild(card);
        });
    } catch(err) {
       console.error("Failed to load homes",err);
    }
}
fetchHomes();
