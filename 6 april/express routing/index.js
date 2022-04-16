const express = require("express");
const app = express();
const products = require("./routes/products");
const users = require("./routes/users");
app.use("/products", products);
app.use("/users", users);
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => console.log("listening"));
