async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
    const users = await res.json();

    if(users.length > 0) {
        alert(`login successfull`);
        window.location.href = "index.html";
    } else {
        alert('invalid username and password');
    }
}
