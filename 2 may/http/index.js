let users = [];
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url == "/users" && req.method == "POST") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      const newUser = { id: users.length + 1, ...JSON.parse(body) };
      users.push(newUser);
      fs.writeFile("./db.txt", JSON.stringify(users), (err) =>
        console.log(err)
      );
      res.end(JSON.stringify(newUser));
    });
  } else if (/\/users\/[0-9]+/.test(req.url) && req.method == "GET") {
    res.statusCode = 200;
    const arr = req.url.split("/");
    const user_id = arr[arr.length - 1];
    fs.readFile("./db.txt", "utf-8", (err, data) => {
      users = JSON.parse(data);
    });
    const val = users.find((user) => user.id === Number(user_id));
    if (val != undefined) res.end(JSON.stringify(val));
    else res.end(JSON.stringify({ message: "user not found" }));
  }
});
server.listen(3000, () => {
  console.log("listening");
});
// /users/{id}, /users
