const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
let fetchInterval = 2000;
const socket = new WebSocket("ws://192.168.0.167:8080");
socket.addEventListener("open", function (event) {
    intervalFetch();
});
function intervalFetch() {
    setInterval(() => {
        fetch("http://192.168.0.167:3000/data")
            .then((response) => response.json())
            .then((json) => {
                data_function(json);
            });
    }, fetchInterval);
}

function data_function(data) {
    const h1 = document.querySelector("h1");
    const lista = document.querySelector("#lista");
    const li = lista.querySelectorAll("li");
    let match = false;

    h1.innerText = `Clients connected: ${data.clients}`;
    for (const l of li) {
        if (l.classList.contains(data.id)) {
            match = true;
            break;
        }
    }

    if (match) {
        console.log(`Element already exists!`);
    } else {
        console.log("Add element...");
        const newLI = document.createElement("li");
        newLI.classList.add(data.id);
        newLI.innerText = `${data.id} - ${data.ipv4}`;
        lista.append(newLI);
    }
}
