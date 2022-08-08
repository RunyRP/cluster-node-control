import { read } from "fs";
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
// const http = require("http");
// const hostname = "127.0.0.1";
// const port = 3000;
const path = require("path");
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const bodyParser = require("body-parser");
import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080, clientTracking: true });
const userData = {
    // id: { ipv4: {} },
    id: {},
    ipv4: {},
};

// EXPRESS!

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", ["*"]);
//     res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });

app.get("/data", (req, res) => {
    console.log(userData);
    res.send(JSON.stringify(userData));
});
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.listen(3000, function () {
    console.log(`Server running at localhost:3000`);
});

// WEBSOCKET!

wss.on("connection", (ws, req) => {
    // userData.id.ipv4 = req.socket.remoteAddress.slice(7);
    userData.ipv4 = req.socket.remoteAddress.slice(7);
    userData.id = uuidv4();
    connections[userData.id] = ws;

    console.log(
        // `Client ${userData.id} - ${userData.id.ipv4} connected! Currently ${wss.clients.size} users online!`
        `Client ${userData.id} - ${userData.ipv4} connected! Currently ${wss.clients.size} users online!`
    );

    ws.on("close", function disconnect() {
        console.log(
            `A client has disconnected! Currently ${wss.clients.size} users online!`
        );
    });
});
