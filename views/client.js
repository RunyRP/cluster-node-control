const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

const socket = new WebSocket("ws://192.168.0.179:8080");
socket.addEventListener("open", function (event) {
    dataFetch();
});

let fetchInterval = 2000;
function dataFetch() {
    setInterval(() => {
        fetch("http://192.168.0.179:3000/data")
            .then((response) => response.json())
            .then((json) => {
                aliveRemove(json);
                data_function(json);
                removeElement(json);
            });
    }, fetchInterval);
}

function aliveRemove() {
    const lista = document.querySelector("#lista");
    const li = lista.querySelectorAll("li");

    if (li.length > 0) {
        for (const l of li) {
            l.classList.remove("alive");
        }
    }
}

let match;

function data_function(data) {
    const h1 = document.querySelector("h1");
    const lista = document.querySelector("#lista");
    const li = lista.querySelectorAll("li");
    h1.innerText = `Clients connected: ${data.length}`;

    if (data.length === 0) {
        return;
    }

    for (const el of data) {
        match = false;
        for (const l of li) {
            if (l.innerText.includes(el.id)) {
                l.classList.add("alive");
                match = true;
                break;
            }
        }

        if (match) {
            continue;
        }
        const newLI = document.createElement("li");
        newLI.classList.add(el.id);
        newLI.innerText = `${el.id} - ${el.ipv4}`;
        lista.append(newLI);

        const wakeup = document.createElement("button");
        const shutdown = document.createElement("button");
        const disconnect = document.createElement("button");

        wakeup.innerText = "Wakeup!";
        shutdown.innerText = "Shutdown!";
        disconnect.innerText = "Disconnect!";

        newLI.append(wakeup, shutdown, disconnect);

        const buttons = document.querySelectorAll("button");

        for (const btn of buttons) {
            btn.classList.add("button-30");
        }

        const actionObj = {};

        wakeup.addEventListener("click", (event) => {
            event.preventDefault();

            actionObj.action = "wakeup";
            actionObj.mac = el.mac;
            actionObj.ipv4 = el.ipv4;
            try {
                fetch("http://192.168.0.179:3000/btnaction", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(actionObj),
                });
            } catch (e) {
                console.log(e);
            }
        });
        shutdown.addEventListener("click", (event) => {
            event.preventDefault();

            actionObj.action = "shutdown";
            actionObj.mac = el.mac;
            actionObj.ipv4 = el.ipv4;
            try {
                fetch("http://192.168.0.179:3000/btnaction", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(actionObj),
                });
            } catch (e) {
                console.log(e);
            }
        });
        disconnect.addEventListener("click", (event) => {
            event.preventDefault();

            actionObj.action = "disconnect";
            actionObj.mac = el.mac;
            actionObj.ipv4 = el.ipv4;
            try {
                fetch("http://192.168.0.179:3000/btnaction", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(actionObj),
                });
            } catch (e) {
                console.log(e);
            }
        });
    }
}

function removeElement() {
    const lista = document.querySelector("#lista");
    const li = lista.querySelectorAll("li");

    if (match) {
        for (const l of li) {
            if (!l.classList.contains("alive")) {
                l.classList.add("disconnected");
                setTimeout(() => {
                    l.remove();
                }, 60000);
            }
        }
    }
}
