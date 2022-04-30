const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const router=express.Router();
// const User = require("./User");

app.use(express.json());
const userRouter = require("./routes");
app.use("/user", userRouter);

app.listen(3000, () => console.log("listening"));
