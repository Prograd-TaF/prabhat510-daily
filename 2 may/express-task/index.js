const express = require("express");
const fs = require("fs");
const { post, all } = require("./routes/posts");
const posts = require("./routes/posts");
const todos = require("./routes/todos");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://alloweddomain.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/todos", todos);
app.use("/posts", posts);
app.get("/getRequests", (req, res) => {
  let all_requests = [];

  const data = fs.readFileSync("./requests.txt", "utf-8");
  let requests = data.split(",");
  requests.forEach((request) => {
    all_requests.push(request);
  });
  res.send(JSON.stringify(all_requests));
});
app.listen(3000, () => {
  console.log("listening");
});
