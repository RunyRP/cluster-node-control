import { createRequire } from "module";
import WebSocket from "ws";

import getMAC, { isMAC } from "getmac";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const wol = require("wol");
const mac = getMAC();
const ws = new WebSocket("ws://192.168.0.179:8080");

app.use(express.json());

ws.on("open", function open() {
    console.log("Connected!");
    ws.send(mac);
});

app.post("/shutdown", function (req, res) {
    console.log("Shutting down!!");
    res.send("Ok!");
    require("child_process").exec("shutdown -s", console.log);
});

let objTest = {};

app.post("/wakeup", function (req, res) {
    console.log("Wakeup!!");
    objTest = req.body;
    wol.wake(objTest.mac, function (err, res) {
        console.log(res);
    });
});

app.post("/disconnect", function (req, res) {
    console.log("disconnect!!");
    ws.close();
    res.send("Ok!");
});

app.listen(4000);
