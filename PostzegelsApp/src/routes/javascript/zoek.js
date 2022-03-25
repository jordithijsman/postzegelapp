let aantalItems;
let list;
let list_root;

document.getElementById("zoekform").onsubmit = async function Submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const responseData = await getPostzegelsFromForm(formData);

    async function getPostzegelsFromForm(formData) {

        const fetchOptions = {
            method: "GET"
        };
        let waar = formData.get("radioZoekWaar");
        let id = formData.get("id") ? formData.get("id") : "NULL";
        let omschrijving = formData.get("omschrijving") ? formData.get('omschrijving') : "NULL";
        let naam = formData.get("naam") ? formData.get('naam') : "NULL";
        let kleur = formData.get("kleur") ? formData.get('kleur') : "NULL";
        let land = formData.get("land") ? formData.get('land') : "NULL";

        return fetch("./postzegel/" + waar + "/" + id + "/" + omschrijving + "/" + naam + "/"
            + kleur + "/" + land, fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.log("fetch volbracht");
                list = data;
                console.log("length: " + list.length);
                if (list.length > 0) {
                    list_root = document.getElementById("allepostzegels");
                    list_root.innerHTML = "";
                    aantalItems = (list.length < 5) ? list.length : 5;
                    for (let i = 0; i < aantalItems; i++) {
                        list_root.appendChild(createListItem(list[i]));
                    }
                } else {
                    alert("Geen postzegels met die beschrijving gevonden")
                }

            });

    }
}

document.getElementById("clickmorenew").addEventListener("click", ShowMoreNew);

//helpers
function ShowMoreNew() {
    if (aantalItems + 5 < list.length) {
        for (let i = aantalItems; i < aantalItems + 5; i++) {
            list_root.appendChild(createListItem(list[i]));
            aantalItems = aantalItems + 5
        }
    } else {
        for (let i = aantalItems; i < list.length; i++) {
            list_root.appendChild(createListItem(list[i]));
            document.getElementById("clickmorenew").hidden = true;
            aantalItems = list.length;
        }
    }
}

function createListItem(item) {
    let listitem = document.createElement("a")
    listitem.setAttribute("href", "/postzegels/" + item._id);
    listitem.setAttribute("class", "list-group-item list-group-item-action");
    listitem.innerHTML = "id: " + item._id + "; " + item._omschrijving;
    return listitem;
}


