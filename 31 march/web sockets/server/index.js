const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

const obj = {
  name: "prabhat",
  age: 22,
  designation: "junior developer",
};

wss.on("connection", (ws) => {
  console.log("connected");

  ws.on("message", (data) => {
    console.log("client sent:", data.toString());
  });

  ws.send(JSON.stringify(obj));

  ws.on("close", () => {
    console.log("client disconnected");
  });
});

// wss.on("connection", (ws) => {
//   console.log("new client connected!");

//   ws.on("message", (data) => {
//     console.log("client has sent", data.toString());

//     ws.send(data.toString().toUpperCase());
//   });

//   ws.on("close", () => {
//     console.log("client has disconnected");
//   });
// });
