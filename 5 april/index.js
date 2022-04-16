const users = [
  { id: 1, name: "prabhat", age: 22, balance: 1000 },
  { id: 2, name: "ravi", age: 32, balance: 2000 },
  { id: 3, name: "ansh", age: 21, balance: 3000 },
];
const express = require("express");
const fs = require("fs");
const app = express();
let unique_id = 4;
app.use(express.json());
app.post(
  "/user/new",
  (req, res) => {
    const { user } = req.body;
    user.id = unique_id;
    unique_id++;
    users.push(user);
    console.log(user);
    req.username = user.name;
    res.json(user);
  },
  logger
);
app.put(
  "/user/edit/:userId",
  (req, res) => {
    const { userId } = req.params;
    let user_idx = -1;
    const user = users.find((user, idx) => {
      if (user.id === Number(userId)) {
        user_idx = idx;
        return true;
      }
      return false;
    });
    if (user === undefined) {
      res.send("user doesnot exits");
    } else {
      const user_body = req.body.user;
      users[user_idx] = user_body;
      req.username = user_body.name;
      res.json(users[user_idx]);
    }
  },
  logger
);
app.get(
  "/user/:userId",
  (req, res, next) => {
    const { userId } = req.params;
    const user = users.find((user) => user.id == Number(userId));
    if (user === undefined) {
      res.send("user doesnot exits");
    } else {
      req.username = user.name;
      res.json(user);
    }
    next();
  },
  logger
);
app.delete(
  "/user/delete/:userId",
  (req, res) => {
    const { userId } = req.params;
    let user_idx = -1;
    const user = users.find((user, idx) => {
      if (user.id === Number(userId)) {
        user_idx = idx;
        return true;
      }
      return false;
    });
    if (user === undefined) {
      res.send("user doesnot exits");
    } else {
      req.username = user.name;
      users.splice(user_idx, 1);
      res.send("user was deleted");
    }
  },
  logger
);
app.get(
  "/user/:userId/balance",
  (req, res) => {
    const { userId } = req.params;
    const user = users.find((user) => user.id === Number(userId));
    if (user === undefined) {
      res.send("user doesnot exists");
    } else {
      req.username = user.name;
      res.send(`your available balance is ${user.balance}`);
    }
  },
  logger
);
app.get(
  "/user/:userId/credit",
  (req, res) => {
    const amount = req.body.amount;
    const { userId } = req.params;
    let user_idx = -1;
    const user = users.find((user, idx) => {
      if (user.id === Number(userId)) {
        user_idx = idx;
        return true;
      }
      return false;
    });
    if (user === undefined) {
      res.send("user doesnot exists");
    } else {
      req.username = user.name;
      users[user_idx].balance += amount;
      res.send(`your updated balance is ${users[user_idx].balance}`);
    }
  },
  logger
);
app.get(
  "/user/:userId/withdraw",
  (req, res) => {
    const amount = req.body.amount;
    const { userId } = req.params;
    let user_idx = -1;
    const user = users.find((user, idx) => {
      if (user.id === Number(userId)) {
        user_idx = idx;
        return true;
      }
      return false;
    });
    if (user === undefined) {
      res.send("user doesnot exists");
    } else {
      req.username = user.name;
      if (amount > users[user_idx].balance) {
        res.send("insufficient balance");
      } else {
        users[user_idx].balance -= amount;
        res.send(`your updated balance is ${users[user_idx].balance}`);
      }
    }
  },
  logger
);
app.all("*", (req, res) => {
  res.sendStatus(404);
  res.send("Not Found");
});

function logger(req, res, next) {
  const data = `${req.username} ${req.method} ${req.path} ${new Date()}\n`;
  fs.appendFileSync("./middleware.txt", data);
  console.log("logger ----------------------");
  //   next();
}
app.listen(3000, () => console.log("listening on 3000"));
