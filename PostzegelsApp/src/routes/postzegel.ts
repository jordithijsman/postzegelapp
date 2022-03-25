import {Router} from "express";
import PostzegelDao from "../dao/PostzegelDAO";
import {Postzegel} from "../entity/Postzegel";
import * as bodyParser from "body-parser";
import {PostzegelInBezit} from "../entity/PostzegelInBezit";
import {PostzegelEuro} from "../entity/PostzegelEuro";
import {PostzegelFrank} from "../entity/PostzegelFrank";
import {PostzegelCode} from "../entity/PostzegelCode";

let jsonParser = bodyParser.json();
let postzegel_router = Router();
let dao = null;

postzegel_router.get("/postzegel", async function (req, res, next) {
    let dao = await new PostzegelDao()
    try {
        dao.getPostzegelList().then(data => {
            if (data != null) {
                res.json(data);
            } else {
                res.sendStatus(404)
            }

        })
    } catch (e) {
        res.sendStatus(500)
    }
});

//get postzegel with id
postzegel_router.get("/postzegel/:id", async function (req, res, next) {
    let dao = await new PostzegelDao()
    try {
        dao.getPostzegelWithId(req.params.id).then(data => {
            if (data != null) {
                res.json(data);
            } else {
                res.sendStatus(404)
            }

        })
    } catch (e) {
        res.sendStatus(500)
    }
});

//get postzegel with parameters
postzegel_router.get("/postzegel/:waar/:id/:omschrijving/:naam/:kleur/:land", async function (req, res, next) {
    let dao = await new PostzegelDao()
    try {
        dao.getPostzegelsVanZoek(req.params.waar, req.params.id, req.params.omschrijving, req.params.naam, req.params.kleur, req.params.land).then(data => {
            if (data != null) {
                res.json(data);
            } else {
                res.sendStatus(404)
            }
        })
    } catch (e) {
        res.sendStatus(500)
    }
});


postzegel_router.post("/postzegel", jsonParser, async function (req, res, next) {
    let dao = await new PostzegelDao()
    try {
        let postzegel = initPostzegel(req.body);
        console.log("postzegel met id " + postzegel.id + "en type " + req.body.type + " toevoegen");
        await dao.addPostzegel(postzegel);
        res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

//updatemethod
postzegel_router.put("/postzegel/:id", jsonParser, async function (req, res, next) {
    let dao = await new PostzegelDao()
    try {
        let postzegel = await dao.getPostzegelWithId(req.params.id);
        if (postzegel == undefined) {
            postzegel = initPostzegel(req);
        } else {
            if (req.body.naam) postzegel.naam = req.body.naam;
            if (req.body.land) postzegel.land = req.body.land;
            if (req.body.omschrijving) postzegel.omschrijving = req.body.omschrijving
            if (req.body.tanding) postzegel.tanding = req.body.tanding;
            if (req.body.kleur) postzegel.kleur = req.body.kleur;
            if (req.body.waarde_gestempeld) postzegel.waarde_gestempeld = req.body.waarde_gestempeld;
            if (req.body.waarde_postfris) postzegel.waarde_postfris = req.body.waarde_postfris;
            if (req.body.postzegels_in_bezit) postzegel.postzegels_in_bezit = req.body.postzegels_in_bezit;
        }
        await dao.updatePostzegel(postzegel);
        res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

//map json to Postzegel object
function initPostzegel(req) {
    let postzegel
    if (req.type == "euro") {
        postzegel = new PostzegelEuro();
    } else if (req.type == "frank") {
        postzegel = new PostzegelFrank();
    } else if (req.type == "code") {
        postzegel = new PostzegelCode();
    } else {
        postzegel = new Postzegel();
    }

    postzegel.id = req.id;
    postzegel.naam = req.naam;
    //postzegel.datum = new Date(req.datum)
    postzegel.land = req.land;
    postzegel.omschrijving = req.omschrijving;
    postzegel.tanding = req.tanding;
    postzegel.kleur = req.kleur;
    postzegel.waarde_gestempeld = req.waarde_gestempeld;
    postzegel.waarde_postfris = req.waarde_postfris
    postzegel.postzegels_in_bezit = new Array<PostzegelInBezit>();
    if (req.prijs == "") {
        postzegel.prijs = 0;
    } else {
        postzegel.prijs = req.prijs;
    }
    return postzegel;
}

export default postzegel_router;


