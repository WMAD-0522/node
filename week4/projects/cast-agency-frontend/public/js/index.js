let token = localStorage.getItem('token');
let userInformation = document.getElementById("user-name");


if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
}

getMe();
getActors();
getAgencies();

function getActors (){
    axios.get('http://localhost:3001/api/actors/')
    .then((res) => {
        const { actors } = res.data;

        document.getElementById("actors").innerHTML = actors.map((actor) => {
            return `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h4 class="card-text">${actor.fullName}</h4>
                            <hr>
                            <h6>Socials</h6>
                            <p class="card-text">${actor.social.facebook}</p>
                            <p class="card-text">${actor.social.linkedIn}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        console.log(actors);
    })
    .catch((err) => {
        console.log(err);
    });

};  

function getAgencies() {
    axios.get('http://localhost:3001/api/agency/')
    .then((res) => {
        const { agencies } = res.data;
        console.log(agencies);

        document.getElementById("agencies").innerHTML = agencies.map((agency) => {
            return `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h4 class="card-text">${agency.name}</h4>
                            <hr>
                            <h6>Bio</h6>
                            <p class="card-text">${agency.bio}</p>
                            <p class="card-text">${agency.email}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        console.log(agencies);
    })
    .catch((err) => {
        console.log(err);
    });
}

function getMe() {
    axios.get('http://localhost:3001/me').then((res) => {
        const { user } = res.data;

        userInformation.innerHTML = `
            <span>Hello ${user.fullName}</span>
        `;
    }).catch((err) => {
        console.log(err);
    });
}

function logout() {
    axios.post("http://localhost:3001/api/auth/logout").then((res) => {
        localStorage.removeItem('token');
        window.location.href = './login.html';
    }).catch((err) => {
        console.log(err);
    });
}