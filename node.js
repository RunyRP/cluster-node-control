// import WebSocket, { WebSocketServer } from "ws";

// const socket = new WebSocket("ws://localhost:3000");
// socket.addEventListener("open", function (event) {
//     socket.send("Hello Server!");
// });

// socket.addEventListener("message", function (event) {
//     console.log("Message from server ", event.data);
// });

// socket.addEventListener("close", function (event) {
//     console.log("The connection has been closed");
// });

import WebSocket from "ws";
const ws = new WebSocket("ws://192.168.0.167:8080");

ws.on("open", function open() {
    console.log("connected!");
});
