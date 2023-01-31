function requestToServer() {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
}

requestToServer();