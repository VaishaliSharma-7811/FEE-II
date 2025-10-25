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

    if(
        !homeData.title ||
        !homeData.description ||
        
        isNaN(homeData.price) ||
        !homeData.location ||
        ! homeData.country
    ) {
        alert("please fill out all fields correctly before submitting.")
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
