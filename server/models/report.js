import mongoose from "mongoose";
const { Schema } = mongoose;

const reportSchema = new Schema({
  name: String,
  email: String,
  profilePic: String,
  reason: String,
  image: String,
  tags: [String],
  title: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
