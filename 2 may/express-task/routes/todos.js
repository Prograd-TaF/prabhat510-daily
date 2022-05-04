const express = require("express");
const fs = require("fs");
const { route } = require("./posts");

const router = express.Router();
router.get("/all", getRequest, (req, res, next) => {
  const todos = JSON.parse(fs.readFileSync("./todos.json"));
  res.json(todos);
  next();
});
router.get("/:todoId", getRequest, (req, res, next) => {
  const id = req.params.todoId;
  const todos = JSON.parse(fs.readFileSync("./todos.json"));
  const val = todos.find((todo) => todo.id === Number(id));
  if (val) {
    res.json(val);
  } else {
    res.json({ message: "todo not found" });
  }
  next();
});

function getRequest(req, res, next) {
  fs.appendFile("./requests.txt", req.method + " " + req.url + ",", (err) =>
    console.log(err)
  );
  next();
}
module.exports = router;
