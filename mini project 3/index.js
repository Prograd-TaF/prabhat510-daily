const express = require("express");
const app = express();
const path = require("path");
var cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dburl =
  "mongodb+srv://prabhat510:Prabhat123@cluster0.h16ts.mongodb.net/sample_db?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("./public"));

var corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});
app.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/login.html"));
});
app.get("/signup", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/signup.html"));
});

app.get("/currency", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/currency.html"));
});
app.get("/numbers", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/numbers.html"));
});
app.get("/speed", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/speed.html"));
});
app.get("/temprature", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/temprature.html"));
});
app.get("/feedback", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./public/feedback.html"));
});
app.get("/showfeedbacks", async (req, res, next) => {
  const client = await mongoClient.connect(dburl);
  try {
    const db = await client.db("sample_db");
    const users = await db.collection("userFeedbacks").find().toArray();
    console.log(users);
    res.render("user-feedbacks", { users: users });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
});

app.post("/user/feedback", cors(corsOptions), async (req, res) => {
  const client = await mongoClient.connect(dburl);
  try {
    const db = await client.db("sample_db");
    const user = await db.collection("userFeedbacks").insertOne(req.body);
    res.json({ message: "user created", user });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
  console.log(req.body);
});
app.all("*", (req, res) => {
  res.sendStatus(404).send("Not Found");
});
app.listen(5500, () => {
  console.log("listening");
});
