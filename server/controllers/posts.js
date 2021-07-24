import express from "express";
import mongoose from "mongoose";
import PostDetails from "../models/post.js";

const router = express.Router();

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostDetails({
    ...post,
    user: req.userId,
    userImage: req.userId,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ error: "Error while creating post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostDetails.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ error: "No Post with that id" });
  await PostDetails.findByIdAndRemove(id);
  res.json({ error: "Post Deleted" });
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with id");

  const updatedPost = await PostDetails.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export default router;
