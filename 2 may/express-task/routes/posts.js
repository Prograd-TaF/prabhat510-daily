const express = require("express");
const fs = require("fs");
const router = express.Router();
router.get("/all", getRequest, (req, res, next) => {
  const posts = JSON.parse(fs.readFileSync("./posts.json"));
  res.json(posts);
  next();
});
router.get("/:postId", getRequest, (req, res, next) => {
  const id = req.params.postId;
  const posts = JSON.parse(fs.readFileSync("./posts.json"));
  const post = posts.find((post) => post.id === Number(id));
  if (post == undefined) {
    res.json({ message: "post not found" });
  } else {
    res.json(post);
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
