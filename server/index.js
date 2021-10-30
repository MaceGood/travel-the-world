import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postsRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import settingsRouter from "./routes/settings.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.set("view engine", "ejs");

app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/settings", settingsRouter);

app.get("/", (req, res) => res.send("rabote"));

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mmongodb+srv://mace:proekt123@cluster0.sowid.mongodb.net/travelTheWorld?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => console.log(`rabote na http://localhost:${PORT}`))
  )
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
