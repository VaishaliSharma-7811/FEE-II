async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(!username) {
        alert(`username is required`);
        return;
    }

    if(username.length<3) {
        alert(`username should be of atleast 6 characters`);
        return;
    }

    if(!password) {
       alert(`password is required`);
       return;

    }

    if(password.length<3) {
        alert(`password should be of atleast 6 characters`);
        return;
    }

    const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
    const users = await res.json();

    if(users.length > 0) {
        alert(`login successfull`);
        window.location.href = "index.html";
    } else {
        alert('invalid username and password');
    }
}
