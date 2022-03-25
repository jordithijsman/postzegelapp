import "reflect-metadata";
import {createConnection} from "typeorm";
import {srvr} from "./app";
import websocket from "./websocket"

const ws = []

//connect DB
createConnection().then(async connection => {
    console.log("DB connection created")
}).then(() => {
    //start listener for express server
    const server = srvr.listen(3000, () => console.log('listening on port 3000'))
    //init WS server
    let wss = websocket(server);
    wss.on('connection', (wsi, req) => {
        //save connected clients to exported array
        ws.push(wsi)
    })
})
    .catch(error => console.log(error.message));

export {ws}


