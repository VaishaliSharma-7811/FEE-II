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

    const checkRes = await fetch(`http://localhost:3001/users?username=${username}`);
    const existing = await checkRes.json();
    if(existing.length > 0) {
        alert(`username already exists`);
        return;
    }

    const res = await fetch(`http://localhost:3001/users`, {
       method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({username,email, password })
});


if(res.ok) {
    alert('Sign-up successfully');
    console.log("Redirecting to login.html...");

    window.location.href = "login.html";

} else {
    alert("sigm-up failed");
}

    


}
