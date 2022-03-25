import "reflect-metadata";
import * as express from "express";
import "path";
import "morgan";
import "body-parser";
import index_router from "./routes";
import postzegel_router from "./routes/postzegel";
import * as path from "path";
import * as bodyParser from "body-parser";
import eigenaar_router from "./routes/eigenaar";
import * as http from "http";
import postzegelinbezit from "./routes/postzegelinbezit";

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routers
app.use(index_router);
app.use(postzegel_router);
app.use(eigenaar_router);
app.use(postzegelinbezit);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const srvr = http.createServer(app);

export {app, srvr};