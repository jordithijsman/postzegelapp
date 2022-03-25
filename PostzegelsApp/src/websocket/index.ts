import * as WebSocket from "ws";

export default (expressServer) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: "/websocket"
    });

    expressServer.on("upgrade", (req, socket, head) => {
        websocketServer.handleUpgrade(req, socket, head, (websocket) =>
        websocketServer.emit("connection", websocket, req))
    })

    return websocketServer;
}