async function handleSignUp(event) {
    event.preventDefault();

    const username = document.getElementById("name").value.trim();
;
    const email = document.getElementById("email").value.trim();
;
    const password = document.getElementById("password").value.trim();
;
    const confirmPassword = document.getElementById("confirm-password").value.trim();
;

    if(password != confirmPassword) {
        alert(`passwords do not match`);
        return;
    }

    if(username.length<3) {
        alert(`enter valid username`);
        return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
        alert("Please enter a valid email address");
        return;
}



    if (!username || !email || !password || !confirmPassword) {
       alert("All fields are required");
       return;
    }
    let res;
    try {
         const checkRes = await fetch(`http://localhost:3001/users?username=${username}`);
    const existing = await checkRes.json();
    if(existing.length > 0) {
        alert(`username already exists`);
        return;
    }

    res = await fetch(`http://localhost:3001/users`, {
       method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({username,email, password })
});

    } catch(e) {
        console.error("Sign-up error:", e);
        alert("Something went wrong. Please try again.");
    }
   

if(res.ok) {
    alert('Sign-up successfully');
    console.log("Redirecting to login.html...");

    window.location.href = "/html/login.html";

} else {
    alert("sign-up failed");
}

    


}
