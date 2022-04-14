const express = require("express");
const mongoDB = require("mongodb");
const app = express();
const mongoClient = mongoDB.MongoClient;
app.use(express.json());
let dburl =
  "mongodb+srv://new_user:prabhat123@cluster0.ymoj2.mongodb.net/new?retryWrites=true&w=majority";
app.get("/user/all", async (req, res) => {
  const client = await mongoClient.connect(dburl);
  try {
    let db = await client.db("MyDB1");
    let data = await db.collection("dataset1").find().toArray();
    res.json({
      message: "GET Sucessful!",
      data,
    });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
});
app.get("/user/:id", async (req, res) => {
  const client = await mongoClient.connect(dburl);
  try {
    let db = await client.db("MyDB1");
    let data = await db.collection("dataset1").find().toArray();
    res.json({
      message: "GET FETCH Sucessful!",
      data,
    });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
});
app.post("/user/new", async (req, res) => {
  const client = await mongoClient.connect(dburl);
  try {
    let db = await client.db("MyDB1");
    let data = await db.collection("dataset1").insertOne(req.body);
    res.json({
      message: "POST Sucessful!",
      data,
    });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
});
app.put("/user/upd", async (req, res) => {
  const client = await mongoClient.connect(dburl);
  try {
    let db = await client.db("MyDB1");
    let data = await db.collection("dataset1").insertOne(req.body);
    res.json({
      message: "PUT Sucessful!",
      data,
    });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
});
app.all("*", (req, res) => {
  res.statusCode = 404;
  res.send("NOT FOUND");
});
