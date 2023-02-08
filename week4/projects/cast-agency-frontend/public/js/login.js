let form = document.getElementById('login-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let data = {
        email: email,
        password: password
    };

    console.log(data);
    axios.post('http://localhost:3001/api/auth/login', data)
    .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        window.location.href = './index.html';
    })
    .catch(err => console.log(err));
});
