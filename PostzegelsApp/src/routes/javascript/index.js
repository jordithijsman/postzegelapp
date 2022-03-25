import {parse} from '/flatted';

let list;
let list_filtered;
let newitemsshow = 5;
let newitemsshow_bezit = 5;
let cookie = getCookie("email")
init();

//socket
let root = window.location.host
let ws = new WebSocket("ws://" + root + "/websocket")
ws.onmessage = function (message) {
    let list_root = document.getElementById("nieuwepostzegels");
    let list_root_bezit = document.getElementById("uwpostzegels")
    let data = parse(message.data)
    console.log(data)
    if (data._postzegels_in_bezit[0]._eigenaren[0]._id === cookie) {
        createListItemMessage(data, list_root_bezit)
        createListItemMessage(data, list_root)
    } else {
        createListItemMessage(data, list_root)
    }

}


//eventlisteners
document.getElementById("clickmorenew").addEventListener("click", ShowMoreNew)
document.getElementById("clickmorenew_bezit").addEventListener("click", ShowMoreNewBezit)
document.getElementById("clickadd").addEventListener("click", addZegel)

function init() {
    let list_root = document.getElementById("nieuwepostzegels");
    let list_root_bezit = document.getElementById("uwpostzegels")

    fetch("./postzegelbezit").then(response => response.json()
        .then(async data => {
            list = data;
            if (list.length < 5) {
                newitemsshow = list.length
            }
            for (let i = 0; i < 5; i++) {
                if (i < list.length) {
                    let item = await createListItem(list[i], list_root);
                } else {
                    document.getElementById("clickmorenew").hidden = true;
                }
            }
            list_filtered = list.filter(item => item._eigenaren[0]._id === cookie)
            if (list_filtered.length < 5) {
                newitemsshow_bezit = list.length
            }
            for (let i = 0; i < 5; i++) {
                if (i < list_filtered.length) {
                    let item = await createListItem(list_filtered[i], list_root_bezit);
                } else {
                    document.getElementById("clickmorenew_bezit").hidden = true;
                }
            }
        }))


}

async function ShowMoreNew() {
    let list_root = document.getElementById("nieuwepostzegels");
    for (let i = newitemsshow; i < newitemsshow + 5; i++) {
        if (i < list.length) {
            await createListItem(list[i], list_root);
        } else {
            document.getElementById("clickmorenew").hidden = true;
        }
    }
    newitemsshow += 5;
}

async function ShowMoreNewBezit() {
    let list_root = document.getElementById("uwpostzegels");
    for (let i = newitemsshow_bezit; i < newitemsshow_bezit + 5; i++) {
        if (i < list_filtered.length) {
            await createListItem(list_filtered[i], list_root);
        } else {
            document.getElementById("clickmorenew").hidden = true;
        }
    }
    newitemsshow_bezit += 5;
}

function addZegel() {
    popitup(document.URL + "popup", "popup")
}

function popitup(url, windowName) {
    let newwindow = window.open(url, windowName, 'height=600,width=900');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}

//helpers
async function createListItem(item, root) {
    let listitem = document.createElement("a")

    listitem.setAttribute("class", "list-group-item list-group-item-action")
    fetch("/eigenaar/" + item._eigenaren[0]._id, {method: "GET"}).then(data => data.json()).then((data) => {
        listitem.innerHTML = "postzegel " + item._postzegel._id + " van " + data._voornaam + " " + data._naam
        root.appendChild(listitem)
    })

}

function createListItemMessage(item, root) {
    let listitem = document.createElement("a")
    listitem.setAttribute("class", "list-group-item list-group-item-action")
    listitem.innerHTML = "postzegel " + item._postzegels_in_bezit[0]._postzegel._id + " van " + item._postzegels_in_bezit[0]._eigenaren[0]._voornaam
        + " " + item._postzegels_in_bezit[0]._eigenaren[0]._naam
    root.appendChild(listitem)

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