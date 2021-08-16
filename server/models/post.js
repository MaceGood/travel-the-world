import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  name: String,
  user: String,
  title: String, // String is shorthand for {type: String}
  userImage: String,
  profilePic: String,
  userEmail: String,
  email: String,
  message: String,
  tags: [String],
  likes: { type: [String], default: [] },
  image: String,
  price: Number,
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
