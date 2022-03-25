import {Router} from "express";
import EigenaarDao from "../dao/EigenaarDAO";
import * as bodyParser from "body-parser";
import {Eigenaar} from "../entity/Eigenaar";
import {PostzegelInBezit} from "../entity/PostzegelInBezit";
import {Contactgegevens} from "../entity/Contactgegevens";

let jsonParser = bodyParser.json();
let eigenaar_router = Router();
let dao = null;

//get eigenaars
eigenaar_router.get("/eigenaar", async function (req, res, next) {
    let dao = await new EigenaarDao()
    try {
        dao.getEigenaarList().then(data => {
            if (data != null) {
                res.json(data);
            } else {
                res.sendStatus(404)
            }

        })
    } catch (e) {
        res.sendStatus(500)
    }
})

//get eigenaar info with id
eigenaar_router.get("/eigenaar/:id", async function (req, res, next) {
    let dao = await new EigenaarDao()
    try {
        dao.getEigenaarWithId(req.params.id).then(data => {
            if (data != null) {
                res.json(data);
            } else {
                res.sendStatus(404);
            }

        })
    } catch (e) {
        res.sendStatus(500)
    }
})

//add new eigenaar
eigenaar_router.post("/eigenaar", jsonParser, async function (req, res, next) {
    let dao = await new EigenaarDao()
    try {
        console.log(await dao.getEigenaarWithId(req.body.email))
        if (await dao.getEigenaarWithId(req.body.email) === undefined) {
            let eigenaar = initEigenaar(req.body);
            await dao.addEigenaar(eigenaar);
            res.sendStatus(201)
        } else {
            res.sendStatus(400)
        }

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

//map json to Eigenaar object
function initEigenaar(req) {
    let gegevens = new Contactgegevens();
    let eigenaar = new Eigenaar();

    eigenaar.gegevens = gegevens;
    gegevens.email = req.email;
    if (req.huisnr == "") {
        gegevens.huisnr = 0
    } else {
        gegevens.huisnr = parseInt(req.huisnr);
    }
    gegevens.straat = req.straat;
    if (req.postcode == "") {
        gegevens.postcode = 0
    } else {
        gegevens.postcode = parseInt(req.postcode);
    }
    gegevens.telefoonnr = req.telefoonnr;
    eigenaar.naam = req.naam;
    eigenaar.voornaam = req.voornaam;
    eigenaar.postzegels = new Array<PostzegelInBezit>();
    return eigenaar;
}


export default eigenaar_router;


