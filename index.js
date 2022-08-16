import { createRequire } from "module";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080, clientTracking: true });
const userData = {
    id: {},
    ipv4: {},
    clients: {},
};

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
    userData.ipv4 = req.socket.remoteAddress.slice(7);
    userData.id = uuidv4();
    connections[userData.id] = ws;
    userData.clients = wss.clients.size;
    console.log(
        `Client ${userData.id} - ${userData.ipv4} connected! ${userData.clients}`
    );

    ws.on("close", function disconnect() {
        userData.clients -= 1;
        console.log(
            `A client has disconnected! Currently ${userData.clients} users online!`
        );
    });
});
