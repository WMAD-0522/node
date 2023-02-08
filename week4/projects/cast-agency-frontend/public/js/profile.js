let name = document.getElementById('name');

getProfile();

function getProfile() {
    axios.get('http://localhost:3001/me').then((res) => {
        const { user } = res.data;

        userInformation.innerHTML = `
            <span>Hello ${user.fullName}</span>
        `;
    }).catch((err) => {
        console.log(err);
    });
}