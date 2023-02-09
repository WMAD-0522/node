let name = document.getElementById('name');
let agencyLink = document.getElementById("cast-link");
let agencyName = document.getElementById("cast-name");
let agencyBio = document.getElementById("cast-bio");
let agencyLocation = document.getElementById("cast-location");
let token = localStorage.getItem("token");
let saveInformation = document.getElementById("save-information");
let fullName = document.getElementById("fullName");
let role = "";
const myModal = document.getElementById('exampleModal')
let roleGroup = document.querySelectorAll('input[name="btnradio"]');

let logoutButton = document.getElementById("logout");


let userId = "";

// agency

let agencyInputName = document.getElementById("agency-name");
let agencyInputBio = document.getElementById("agency-bio");
let agencyInputLocation = document.getElementById("agency-location");
let agencyInputPhoneNumber = document.getElementById("agency-phone");
let agencyInputWebsite = document.getElementById("agency-website");
let agencyInputEmail = document.getElementById("agency-email");
let agencyInputLogo = document.getElementById("agency-logo");
let agencyInputSince = document.getElementById("agency-since");
let agencyCreateButton = document.getElementById("create-agency");
// actor

let actorInputName = document.getElementById("actor-name");
let actorInputAge = document.getElementById("actor-age");
let actorInputGender = document.getElementById("actor-gender");
let actorInputAvatar = document.getElementById("actor-avatar");
let actorInputHeight = document.getElementById("actor-height");
let actorInputWeight = document.getElementById("actor-weight");
let actorInputEyes = document.getElementById("actor-eyes");
let actorInputFacebook = document.getElementById("actor-facebook");
let actorInputLinkedIn = document.getElementById("actor-linkedIn");
let actorInputAgency = document.getElementById("actor-agency");

let actorCreateButton = document.getElementById("create-actor");


let actors = document.getElementById("actors");


if(token){
    axios.defaults.headers.common["Authorization"] = `${token}`;
}

getMe();

function getMe(){
    axios.get("http://localhost:3001/me").then(
        data => {
            const { fullName, role, agencies } = data.data.user;
            console.log(data);
            userId = data.data.user._id;

            name.innerText = fullName;

            agencies.forEach((item) => {
                console.log(item);

                document.getElementById("actor-agency").innerHTML += `
                    <option value="${item._id}">${item.name}</option>
                `;

                document.getElementById("agencies").innerHTML += `
                <div class="list-of-agencies">
                    <div class="col-md-6">
                        <div id="agency-body" class="h-100 p-5 text-bg-dark rounded-3">
                            <h2 id="cast-name">${item.name}</h2>
                            <p id="cast-bio">${item.bio}</p>
                            <p id="cast-location">${item.location}</p>
                            <div class="actors">${item.actors.length} actor(s) registered.</div>
                        </div>
                    </div>
                </div>
                `
            })

            if(role === "AGENCY"){
                agencyLink.style.display = "block";
            }else{
                agencyLink.style.display = "none";
            }

            document.getElementById("badge").innerHTML = role;
            
        }
    )
}

function updateInformations(fullName, role, agent){

    let data = {};

    if(fullName !== ""){
        data.fullName = fullName;
    }
    if(role !== ""){
        data.role = role;
    }
    if(agent !== ""){
        data.agent = agent;
    }

    console.log(data);

    axios.put("http://localhost:3001/update", data)
    .then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

roleGroup.forEach((item) => {
    item.addEventListener("click", () => {
        console.log(item.value);
        role = item.value;
    })
});

saveInformation.addEventListener("click", () => {
    updateInformations(fullName.value, role);
    myModal.style.display = "none";
    getMe();
    window.location.reload();
});

function createAgency(){

    let phoneNumber = agencyInputPhoneNumber.value.replace(/-/g, "");

    if(agencyInputName.value === "" || agencyInputBio.value === "" || agencyInputLocation.value === "" || agencyInputWebsite.value === "" || phoneNumber === "" || agencyInputEmail.value === "" || agencyInputLogo.value === "" || agencyInputSince.value === ""){
        alert("Please fill all the fields");
        return;
    }
    
    let data = {
        name: agencyInputName.value,
        location: agencyInputLocation.value,
        phoneNumber: phoneNumber,
        email: agencyInputEmail.value,
        website: agencyInputWebsite.value,
        bio: agencyInputBio.value,
        logo: agencyInputLogo.value,
        since: agencyInputSince.value,
        user: userId
    }

    axios.post("http://localhost:3001/api/agency/", data)
        .then(data => {
            updateInformations("", "", data.data._id);
            window.location.reload();
        }).catch(err => {
            console.log(err);
        })
}

function createActor(){
    if(actorInputName.value === "" || actorInputAge.value === "" || actorInputGender.value === "" || actorInputAvatar.value === "" || actorInputHeight.value === "" || actorInputWeight.value === "" || actorInputEyes.value === "" || actorInputFacebook.value === "" || actorInputLinkedIn.value === "" || actorInputAgency.value === ""){
        alert("Please fill all the fields");
        return;
    }

    let data = {
        fullName: actorInputName.value,
        age: actorInputAge.value,
        gender: actorInputGender.value,
        avatar: actorInputAvatar.value,
        physical_information: {
            height: actorInputHeight.value,
            weight: actorInputWeight.value,
            eyes: actorInputEyes.value
        },
        social: {
            facebook: actorInputFacebook.value,
            linkedin: actorInputLinkedIn.value
        },
        agent: actorInputAgency.value,
    }

    axios.post("http://localhost:3001/api/actors/", data)
        .then(data => {
            console.log(data);
            window.location.reload();
        }).catch(err => {
        console.log(err);
    })
}
            
agencyCreateButton.addEventListener("click", () => {
    createAgency();
});

actorCreateButton.addEventListener("click", () => {
    createActor();
});

logoutButton.addEventListener("click", () => {
    // we will call logout endpoint
    // then we will delete token from localstorage
    // then we will redirect to login page
    axios.post("http://localhost:3001/api/auth/logout").then(
        data => {
            localStorage.removeItem("token");
            window.location.href = "./login.html";
        }
    ).catch((err) => {
        console.log(err);
    });
})