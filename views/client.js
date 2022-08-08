const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};
let data = {};
const socket = new WebSocket("ws://192.168.0.167:8080");
socket.addEventListener("open", function (event) {
    setInterval(() => {
        fetch("http://192.168.0.167:3000/data")
            .then((response) => response.json())
            .then((json) => data_function(json));
        // console.log(`Client ${data.id} - ${data.ipv4} connected!`);
        // .then((data) => {

        // const newLI = document.createElement("LI");
        // newLI.innerText = `${data.id} - ${data.ipv4}`;
        // lista.append(newLI);
    }, 5000);
});
let connectedUsers = [];
function data_function(data) {
    // connectedUsers.push(data.id);
    // console.log(`this is your fetched data`);
    // console.log(typeof data);
    // let exists = false;
    do {
        connectedUsers.push(data.id);
        console.log(connectedUsers);
    } while (!Object.values(data).includes(data.id));

    // console.log(connectedUsers);
    // connectedUsers.push(data.id);
    // // Object.values(data).includes(data.id);
    // console.log(Object.values(data));
    // console.log(Object.values(data).indexOf(connectedUsers));
    // console.log(data.id);
    // console.log(exists);

    // if (!connectedUsers.includes(data.id)) {
    //     connectedUsers.push(data.id);
    //     console.log(connectedUsers);
    // }
    // connectedUsers.push(data.id);
    // let isConnected = false;
    // console.log(connectedUsers);

    // if (data.id != connectedUsers[0]) {
    //     isConnected = false;
    // } else {
    //     isConnected = true;
    // }
    // if ((isConnected = false)) {
    //     const newLI = document.createElement("LI");
    //     newLI.innerText = `${data.id} - ${data.ipv4}`;
    //     lista.append(newLI);
    // }
}
