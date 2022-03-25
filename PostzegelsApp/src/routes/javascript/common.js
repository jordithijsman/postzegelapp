//handle login action on all views
let login_btn = document.getElementById("login");
let logout_btn = document.getElementById("logout");

if (getCookie("email") !== "") {
    login_btn.hidden = true;
    logout_btn.hidden = false;
} else {
    login_btn.hidden = false;
    logout_btn.hidden = true;
}

login_btn.addEventListener("click", () => {
    let email = prompt("email address:")
    while (!validateEmail(email)) {
        if (email === null) {
            return;
        }
        email = prompt("Please enter a valid emailadres")
    }
    fetch("/eigenaar/" + email, {method: "GET"}).then((res) => {
        if (res.status === 404) {
            alert("Dit emailadres is niet geregistreerd!")
        } else {
            setCookie("email", email, 7);
            alert("U bent ingelogd!")
            login_btn.hidden = true;
            logout_btn.hidden = false;
            location.reload()
        }
    })
})

logout_btn.addEventListener("click", () => {
    delete_cookie("email", "/");
    alert("U bent uitgelogd!");
    login_btn.hidden = false;
    logout_btn.hidden = true;
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameString = name + "="

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })

    if (value.length) {
        return value[0].substring(nameString.length, value[0].length)
    } else {
        return ""
    }
}

function delete_cookie(name, path) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}