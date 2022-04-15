const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Hello World!</h2>");
});
app.get("/users/:name", (req, res) => {
  const name = req.params.name;
  res.send(name);
});

app.get("/users/?name=prabhat&age=22", (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  console.log(name.value);
  console.log(age.value);
});
app.all("*", (req, res) => {
  res.send("NOT Found");
});
app.listen(4000, () => console.log("listening"));
