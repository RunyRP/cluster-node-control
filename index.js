import { createRequire } from "module";
import fetch from "node-fetch";
const require = createRequire(import.meta.url);

const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const wol = require("wol");
const connections = {};
const fs = require("fs");

const path = require("path");
import { fileURLToPath } from "url";
import { dirname } from "path";
import getMAC, { isMAC } from "getmac";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080, clientTracking: true });
const userData = [];

// EXPRESS!
// Static files
app.use(express.static(path.join(__dirname, "views")));

app.get("/data", (req, res) => {
    res.send(JSON.stringify(userData));
});

app.get("/", (req, res) => {
    res.sendFile(`index.html`);
});

app.listen(3000, function () {
    console.log(`Server running at http://localhost:3000`);
});

// WEBSOCKET!

wss.on("connection", (ws, req) => {
    ws.on("message", (event) => {
        const user = {
            id: "",
            ipv4: "",
            mac: "",
        };
        user.mac = event.toString();
        console.log(user.mac);
        user.ipv4 = req.socket.remoteAddress.slice(7);
        user.id = uuidv4();
        ws.id = user.id;
        userData.push(user);
        console.log(
            `A client has connected! currently ${userData.length} users online!`
        );
        console.log(userData);
    });
    ws.on("close", function disconnect() {
        if (!userData.includes(ws.id)) {
            console.log("Nope!");
            const index = userData.findIndex((object) => {
                return object.id === ws.id;
            });
            userData.splice(index, 1);
            console.log(index);
        }
        console.log(
            `A client has disconnected! Currently ${userData.length} users online!`
        );
        console.log(userData);
    });
});

// const objTest = {
//     id: "something",
//     ip: "34",
//     action: "wakeup",
// };
// const action = objTest.action;
// let postFetchTime = 5000;
// switch (action) {
//     case "shutdown":
//         setTimeout(() => {
//             try {
//                 fetch("http://192.168.0.228:4000/shutdown", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }).then((response) => {
//                     console.log("sos!");
//                 });
//             } catch (e) {
//                 console.log(e);
//             }
//         }, postFetchTime);
//         break;
//     case "wakeup":
//         setTimeout(() => {
//             try {
//                 fetch("http://192.168.0.228:4000/wakeup", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }).then((response) => {
//                     console.log("sos!");
//                 });
//             } catch (e) {
//                 console.log(e);
//             }
//         }, postFetchTime);
//         break;
// }
