const mongoose = require("mongoose");
const dburl =
  "mongodb+srv://prabhat510:Prabhat123@cluster0.h16ts.mongodb.net/user_validation?retryWrites=true&w=majority";
mongoose.connect(dburl);

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (data) => `${data.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v);
      },
      message: (data) => `${data.value} is not a valid password`,
    },
  },
});
module.exports = mongoose.model("User", userSchema);
