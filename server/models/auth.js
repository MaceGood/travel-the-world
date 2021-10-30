import mongoose from "mongoose";
// import validator from "validator";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  // name: {
  // type: String,
  // required: [true, "Enter a username."],
  // validate: [
  //   validator.isAlphanumeric,
  //   "Usernames may only have letters and numbers.",
  // ],
  // },
  imageUrl: String,
  email: {
    type: String,
    // require: [true, "Enter an email address."],
    // unique: [true, "That email address is taken."],
    // lowercase: true,
    // validate: [validator.isEmail, "Enter a valid email address."],
  },
  password: {
    type: String,
    // required: [true, "Enter a password."],
    // minLength: [5, "Password should be at least 5 characters"],
  },
  id: String,
});

const User = mongoose.model("User", userSchema);
export default User;
