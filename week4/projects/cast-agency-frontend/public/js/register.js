let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    register(fullName.value, email.value, password.value);
})

function register(fullName, email, password){
    let data = {
        fullName: fullName,
        email: email,
        password: password
    }

    axios.post("http://localhost:3001/api/auth/register", data)
    .then(data => {
        console.log(data);
        window.location.href = "./login.html";
    }).catch(err => {
        console.log(err);
    })
}
