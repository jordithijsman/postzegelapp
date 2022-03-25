let newitemsshow = 5;
let list_root = document.getElementById("allepostzegels");
let list;
document.getElementById("clickmorenew").addEventListener("click", ShowMoreNew)
init()

function init() {
    fetch("./postzegel").then(response => response.json())
        .then(data => {
            console.log(data)
            list = data;
            if (list.length < 5) {
                newitemsshow = data.length
                for (let i = 0; i < list.length; i++) {
                    list_root.appendChild(createListItem(list[i]));
                }
                document.getElementById("clickmorenew").hidden = true;
            } else {
                for (let i = 0; i < 5; i++) {
                    list_root.appendChild(createListItem(list[i]));
                }
            }
        })
}

function ShowMoreNew() {
    if (newitemsshow + 5 < list.length) {
        for (let i = newitemsshow; i < newitemsshow + 5; i++) {
            list_root.appendChild(createListItem(list[i]));
        }
        newitemsshow = newitemsshow + 5
    } else {
        for (let i = newitemsshow; i < list.length; i++) {
            list_root.appendChild(createListItem(list[i]));
            document.getElementById("clickmorenew").hidden = true;
        }
        newitemsshow = list.length
    }
}


function createListItem(item) {
    let listitem = document.createElement("a")
    listitem.setAttribute("href", "/postzegels/" + item._id)
    listitem.setAttribute("class", "list-group-item list-group-item-action")
    listitem.innerHTML = item._id + ": " + item._naam
    return listitem
}