const express = require("express");
const app = express();
const threshold = 5;
let currTime = 0;
app.use(express.json());

app.get(
  "/",
  (req, res, next) => {
    next();
  },
  logger
);

app.all("*", (req, res) => {
  console.log("pop up send");
});
app.listen(3000, () => {
  console.log("listening");
});
function logger(req, res, next) {
  setInterval(() => {
    currTime = currTime + 1;
    if (currTime === threshold) {
      console.log("threshold time");
      res.redirect("http://127.0.0.1:5501/home.html");
      next();
    }
  }, 1000);
}
