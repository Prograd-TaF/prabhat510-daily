const { application } = require("express");
const express = require("express");
const { route } = require("./products");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users router home page");
});
router.get("/:userId/:productId", (req, res) => {
  res.send(
    `users request id is ${req.params.userId} and product id is ${req.params.productId}`
  );
});
router.get(/\/([0-9]{5,5})/, (req, res) => {
  res.send("5 digit id passed");
});
router.get(/\/[a-zA-Z]{8,8}/, (req, res) => {
  res.send("8 characters username");
});
router.all("*", (req, res) => {
  res.status(404);
  res.send("Not Found");
});
module.exports = router;
