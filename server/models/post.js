import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  name: String,
  user: String,
  title: String, // String is shorthand for {type: String}
  userImage: String,
  profilePic: String,
  message: String,
  tags: [String],
  image: String,
  price: Number,
  date: { type: Date, default: Date.now },
});

const PostDetails = mongoose.model("PostDetails", postSchema);
export default PostDetails;
