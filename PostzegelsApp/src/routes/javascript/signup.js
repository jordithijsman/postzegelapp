document.getElementById("gegevensform")
    .onsubmit = async function Submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson(formData);

    async function postFormDataAsJson(formData) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formDataJsonString,
        };

        const response = await fetch("/eigenaar", fetchOptions);
        let message = document.createElement("h1");
        if (response.status === 201) {
            document.getElementById("content").innerHTML = "";
            let message = document.createElement("h1");
            message.innerHTML = "U bent geregistreerd!"
            document.getElementById("content").appendChild(message);
        } else if (response.status === 400) {
            let message = document.createElement("h1");
            message.innerHTML = "Email is reeds geregistreerd!"
            document.getElementById("content").appendChild(message);
        }
    }
}


