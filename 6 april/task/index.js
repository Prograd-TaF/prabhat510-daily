const express = require("express");
const app = express();
app.use(express.json());
let users = [];
app.get("/users", (req, res) => {
  if (users.length === 0) {
    res.send("no users found!!");
  } else {
    res.json(users);
  }
});

app.post("/create/new", (req, res) => {
  const user = req.body.user;
  user.id = users.length + 1;
  users.push(user);
  res.json(user);
});

app.get("/get/latest", (req, res) => {
  const user = users[users.length - 1];
  if (user == undefined) {
    res.send("no users found!!");
  } else {
    res.json(user);
  }
});

app.delete("/user/:userId/delete", (req, res) => {
  const user = users[users.length - 1];
  if (user == undefined) {
    res.send("no users found!!");
  } else {
    users.pop();
    res.json(`user was deleted`);
  }
});
app.listen(3000);
