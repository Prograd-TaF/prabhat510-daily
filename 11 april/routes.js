const express = require("express");
const app = express.Router();
const User = require("./User");
app.use(express.json());

app.get("/all", async (req, res) => {
  const data = await User.find({});
  console.log(data);
  res.json(data);
});
app.post("/newdata", async (req, res) => {
  const data = await req.body;
  console.log(data);
  const user = await User.exists({ email: data.email });
  if (!user) {
    const newUser = new User(data);
    await newUser.save();
    console.log(newUser);
    res.json(newUser);
  } else {
    console.log("mail id exists");
    res.json("mail id exists");
  }
});
module.exports = app;
