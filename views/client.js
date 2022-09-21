const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
let fetchInterval = 2000;
const socket = new WebSocket("ws://192.168.0.179:8080");
socket.addEventListener("open", function (event) {
    intervalFetch();
});

function intervalFetch() {
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

    console.log(data);

    for (const el of data) {
        console.log(el);
        match = false;
        for (const l of li) {
            if (l.innerText.includes(el.id)) {
                // l.classList.add("alive");
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
    }
}

function removeElement() {
    const lista = document.querySelector("#lista");
    const li = lista.querySelectorAll("li");

    if (match) {
        for (const l of li) {
            if (!l.classList.contains("alive")) {
                l.remove();
            }
        }
    }
}
