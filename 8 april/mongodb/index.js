// connect using mongoClient
// specify the database
// specify the collection
// perform the crud operation

const express = require("express");
const mongodb = require("mongodb");
const app = express();
const mongoClient = mongodb.MongoClient;

app.use(express.json());

const dburl =
  "mongodb+srv://prabhat510:Prabhat123@cluster0.h16ts.mongodb.net/sample_db?retryWrites=true&w=majority";

app.get("/", async (req, res) => {
  const client = await mongoClient.connect(dburl);
  try {
    const db = await client.db("sample_db");
    const users = await db.collection("users").find().toArray();
    res.json({ message: "display data", users });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
});
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const client = await mongoClient.connect(dburl);
  try {
    const db = await client.db("sample_db");
    const user = await db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
    res.json(user);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
});
app.post("/add-user", async (req, res) => {
  const client = await mongoClient.connect(dburl);
  try {
    const db = await client.db("sample_db");
    const user = await db.collection("users").insertOne(req.body);
    res.json({ message: "user created", user });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
});
app.put("/user/:userId/edit", async (req, res) => {
  const { userId } = req.params;
  const client = await mongoClient.connect(dburl);
  try {
    const db = await client.db("sample_db");
    const user = await db
      .collection("users")
      .updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: { age: 22 } });
    res.json({ message: "user updated", user });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
});
app.delete("/user/:userId/delete", async (req, res) => {
  const { userId } = req.params;
  const client = await mongoClient.connect(dburl);
  try {
    const db = await client.db("sample_db");
    const user = await db
      .collection("users")
      .deleteOne({ _id: new mongodb.ObjectId(userId) });
    res.json({ message: "user was deleted from databse", user });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
});
app.listen(3000, () => console.log("listening on 3000"));
