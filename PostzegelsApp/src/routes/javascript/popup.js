document.getElementById("gegevensform")
    .onsubmit = async function Submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson(formData);

    async function postFormDataAsJson(formData) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
        console.log(formDataJsonString)

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formDataJsonString,
        };
        let email = getCookie("email");
        if (email === "") {
            email = 'NULL'
        }
        const response = await fetch("/postzegelbezit/" + email, fetchOptions);
        let message = document.createElement("h1");
        if (response.status === 201) {
            document.getElementById("content").innerHTML = "";
            let message = document.createElement("h1");
            message.innerHTML = "Postzegel toegevoegd";
            document.getElementById("content").appendChild(message);
        } else if (response.status === 400) {
            let message = document.createElement("h1");
            message.innerHTML = "postzegel toevoegen mislukt, postzegel_id is niet aantwezig";
            document.getElementById("content").appendChild(message);
        } else if (response.status === 401) {
            let message = document.createElement("h1");
            message.innerHTML = "Gelieve eerst in te loggen";
            document.getElementById("content").appendChild(message);
        }
        return response.json();
    }
}

function getCookie(name) {
    const nameString = name + "=";

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })

    if (value.length) {
        return value[0].substring(nameString.length, value[0].length)
    } else {
        return ""
    }
}




