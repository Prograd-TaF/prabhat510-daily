const mongoose = require("mongoose");

// connecting to database
mongoose.connect(
  "mongodb+srv://prabhat510:Prabhat123@cluster0.h16ts.mongodb.net/mongoose_practice?retryWrites=true&w=majority"
);

// defining user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: "Email is Required",
    validate: {
      validator: (email) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        );
      },
      message: "Email is not valid",
    },
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  phone: {
    type: String,
  },
  gender: String,
  hobbies: [String],
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// adding methods to the schema
userSchema.methods.isEligibleToVote = function () {
  if (this.age >= 18) return true;
  return false;
};

// after schema we create model to connect with schema
const User = mongoose.model("User", userSchema);

// const main = async () => {
//   try {
//     const user = new User({
//       name: "prabhat222",
//       email: "prabh222232@gmail.com",
//       age: 10,
//       phone: 9367836228329,
//       gender: "M",
//       hobbies: ["singing", "reading"],
//     });

//     await user.save();
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// this function creates a new user and all the validations are performed against each field
// main();

// const main = async () => {
//   try {
// for each object_id stored in the friends array, the populate method will convert the object_id stored  into the object having id as object_id
//     const prabhat = await User.find({ name: "prabhat" }).populate("friends");
//     console.log(prabhat[0].friends[0]);
//     prabhat.save();
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// main();

const main = async () => {
  try {
    const prabhat = await User.findOne({ name: "prabhat" });
    console.log(prabhat.isEligibleToVote());
  } catch (error) {
    console.log(error);
  }
};
main();
