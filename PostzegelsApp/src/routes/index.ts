import {Router} from "express";
import * as path from "path";

let index_router = Router();

//render routes
index_router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
index_router.get("/postzegels/:id", function (req, res, next) {
    res.render('postzegel', {title: 'Express'})
})
index_router.get("/postzegels", function (req, res, next) {
    res.render('postzegels', {title: 'Express'})
})
index_router.get("/signup", function (req, res, next) {
    res.render('signup', {title: 'Express'})
})
index_router.get("/popup", function (req, res, next) {
    res.render('popup', {title: 'Express'})
})
index_router.get("/zoek", function (req, res, next) {
    res.render('zoek', {title: 'Express'})
})


//scripts
index_router.get('/javascript/index.js', function (req, res, next) {
    res.sendFile(path.join(__dirname + "/javascript/index.js"));
})
index_router.get('/javascript/signup.js', function (req, res, next) {
    res.sendFile(path.join(__dirname + "/javascript/signup.js"));
})
index_router.get('/javascript/postzegels.js', function (req, res, next) {
    res.sendFile(path.join(__dirname + "/javascript/postzegels.js"));
})
index_router.get('/javascript/postzegel.js', function (req, res, next) {
    res.sendFile(path.join(__dirname + "/javascript/postzegel.js"));
})
index_router.get('/javascript/common.js', function (req, res, next) {
    res.sendFile(path.join(__dirname + "/javascript/common.js"));
})
index_router.get('/javascript/zoek.js', function (req, res, next) {
    res.sendFile(path.join(__dirname + "/javascript/zoek.js"));
})
index_router.get('/javascript/popup.js', function (req, res, next) {
    res.sendFile(path.join(__dirname + "/javascript/popup.js"));
})
index_router.get('/flatted', function (req, res, next) {
    res.sendFile("/node_modules/flatted/esm/index.js", {root: '.'});
})

export default index_router;