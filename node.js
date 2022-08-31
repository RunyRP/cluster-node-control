import { createRequire } from "module";
import WebSocket from "ws";
import getMAC, { isMAC } from "getmac";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const wol = require("wol");
const mac = getMAC();
// console.log(mac);
const ws = new WebSocket("ws://192.168.0.167:8080");
ws.on("open", function open() {
    console.log("Connected!");
    ws.send(mac);
});

app.post("/shutdown", function (req, res) {
    console.log("shutting down!");
    require("child_process").exec("shutdown -s", console.log);
});

app.post("/wakeup", function (req, res) {
    console.log("wakeup!!");
    // wol.wake(mac, function (err, res) {
    //     console.log(res);
    // });
});

app.listen(4000);
