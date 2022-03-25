const id = document.documentURI.split("/")[document.documentURI.split("/").length - 1];
const fetchOptions = {
    method: "GET"
};

const response = fetch("../postzegel/" + id, fetchOptions).then(data => {
    data.json().then(data => {
        for (let key in data) {
            let card = document.createElement("div")
            card.setAttribute("class", "card m-2")
            let header = document.createElement("div")
            header.setAttribute("class", "card-header")
            let body = document.createElement("div")
            body.setAttribute("class", "card-body")
            body.innerText = data[key]
            header.innerText = key.replaceAll("_", " ").trim();
            card.appendChild(header)
            card.appendChild(body)
            let main = document.getElementById("main")
            main.appendChild(card)

        }
    })
});



