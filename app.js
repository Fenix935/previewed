(function () {
    function reqvest (url) {
        fetch("http://127.0.0.1:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "url": url,
                "give": "json"
            })
        })
        .then(response => {
            console.log(response);
            return response.text();
        })
        .then(json => console.log(json))
    }
    reqvest("www.youtube.com")
})()