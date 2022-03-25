import {Router} from "express";
import PostzegelInBezitDao from "../dao/PostzegelInBezitDao";
import * as bodyParser from "body-parser";
import {PostzegelInBezit} from "../entity/PostzegelInBezit";
import PostzegelDao from "../dao/PostzegelDAO";
import EigenaarDao from "../dao/EigenaarDAO";

let jsonParser = bodyParser.json();
let postzegel_in_bezit_router = Router();

//return list of all PostzegelInBezit
postzegel_in_bezit_router.get("/postzegelbezit", async function (req, res, next) {
    let dao_bezit = await new PostzegelInBezitDao()
    try {
        dao_bezit.getPostzegelInBezitList().then(data => {
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


postzegel_in_bezit_router.post("/postzegelbezit", jsonParser, async function (req, res, next) {
    let dao_bezit = await new PostzegelInBezitDao()
    let dao_postzegel = await new PostzegelDao();
    try {
        let postzegel = await initPostzegelInBezit(req, dao_postzegel);
        await dao_bezit.addPostzegelInBezit(postzegel);
        res.sendStatus(200);

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

//add new PostzegelInBezit for a user with email
postzegel_in_bezit_router.post("/postzegelbezit/:email", jsonParser, async function (req, res, next) {
    let dao_bezit = await new PostzegelInBezitDao()
    let dao_postzegel = await new PostzegelDao();
    try {
        if (req.params.email == "NULL") {
            res.sendStatus(401);
        } else if (await dao_postzegel.getPostzegelWithId(req.body.id_postzegel) == undefined) {
            res.sendStatus(400);
        } else {
            let postzegel = await initPostzegelInBezit(req, dao_postzegel);
            await dao_bezit.addPostzegelInBezit(postzegel);
            res.sendStatus(201);
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

//map json body to PostzegekInBezit object
async function initPostzegelInBezit(req, dao_postzegel) {
    let eigenaar_dao = await new EigenaarDao();
    let eigenaar = await eigenaar_dao.getEigenaarWithId(req.params.email);
    let postzegel = await dao_postzegel.getPostzegelWithId(req.body.id_postzegel);
    let p = new PostzegelInBezit();
    p.postfris = req.body.postfris;
    p.gegomd = req.body.gegogmd;
    p.aantal = req.body.aantal;
    p.postzegel = postzegel;
    postzegel.postzegels_in_bezit.push(p);
    p.eigenaren.push(eigenaar);
    console.log(eigenaar)
    eigenaar.postzegels.push(p);
    return p

}
export default postzegel_in_bezit_router;


