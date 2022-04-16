const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("products home page");
});
router.get("/shoes", (req, res) => {
  res.send("in products viewing shoes");
});

module.exports = router;
