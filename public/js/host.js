document.querySelector("#hostForm").addEventListener("submit", async(e) => {
    e.preventDefault();

    const homeData = {
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        image: document.getElementById("image").value,
        price: document.getElementById("price").value,
        location: document.getElementById("location").value,
        country: document.getElementById("country").value

    };

    const errors = [];

  if (!homeData.title || homeData.title.length < 3) {
    errors.push("Title must be at least 3 characters.");
  }

  if (!homeData.description || homeData.description.length < 10) {
    errors.push("Description must be at least 10 characters.");
  }
  

  

  if (!homeData.price || isNaN(homeData.price) || Number(homeData.price) <= 0) {
    errors.push("Price must be a positive number.");
  }

  if (!homeData.location || homeData.location.length < 2) {
    errors.push("Location must be at least 2 characters.");
  }
if (!homeData.country || homeData.country.length < 2) {
  errors.push("Country must be at least 2 characters.");
}

  if (errors.length > 0) {
    alert("⚠ Please fix the following:\n\n" + errors.join("\n"));
    return;
  }





    try {
        const res = await fetch("http://localhost:3001/homes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(homeData)
        });
        if(res.ok) {
            alert("listing added successfully");
            e.target.reset();
        } else {
            alert("failed to add your listing");
        }
    }catch(e) {
        console.log("Error: ",e);
        alert("Server Error");
    }
})
