const mongoose = require("mongoose");
const User = require("./user");
mongoose.connect(
  "mongodb+srv://new_user:prabhat123@cluster0.ymoj2.mongodb.net/demo?retryWrites=true&w=majority"
);
run();
async function run() {
  const user = new User({ name: "prabhat", age: 22 });
  await user.save();
  console.log(user);
}
