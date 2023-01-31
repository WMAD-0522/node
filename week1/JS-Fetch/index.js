function createCoctail(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((res) => res.json())
        .then((data) => {
            displayData(data);
        }).catch((err) => {
            console.log(err);
        })
}

function displayData(data) {
    console.log(data);
    const coctail = data.drinks[0];

    const coctailName = document.createElement("h2");
    coctailName.innerHTML = coctail.strDrink;

    const coctailImage = document.createElement("img");
    coctailImage.src = coctail.strDrinkThumb;
    coctailImage.width = "200";
    coctailImage.height = "200";

    const container = document.getElementById("content");
    container.insertBefore(coctailImage, container.firstChild);
    container.insertBefore(coctailName, container.firstChild);

}