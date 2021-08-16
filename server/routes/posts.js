import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  likePost,
  reportPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/like", auth, likePost);
router.post("/:id/report", auth, reportPost);

export default router;
