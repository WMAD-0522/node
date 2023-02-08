let name = document.getElementById('name');
let agencyLink = document.getElementById("agency-link");
let agencyName = document.getElementById("agency-name");
let agencyBio = document.getElementById("agency-bio");
let agencyLocation = document.getElementById("location");
let token = localStorage.getItem("token");

if(token){
    axios.defaults.headers.common["Authorization"] = `${token}`;
}

getMe();

function getMe(){
    axios.get("http://localhost:3001/me").then(
        data => {
            const { fullName, role, agency } = data.data.user;
            console.log(data);

            name.innerText = fullName;
            agencyName.innerText = agency.name;
            agencyBio.innerText = agency.bio;
            agencyLocation.innerText = agency.location;

            if(role === "AGENCY"){
                agencyLink.style.display = "block";
            }else{
                agencyLink.style.display = "none";
            }
            
        }
    )
}