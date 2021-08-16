import express from "express";
import mongoose from "mongoose";
import Post from "../models/post.js";
import Report from "../models/report.js";

const router = express.Router();

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({
    ...post,
    user: req.userId,
    userImage: req.userId,
    userEmail: req.userId,
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
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ error: "No Post with that id" });
  await Post.findByIdAndRemove(id);
  res.json({ message: "Post Deleted" });
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with id");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await Post.findById(id);

  const idx = post.likes.findIndex((id) => id === String(req.userId));

  if (idx === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const likedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(likedPost);
};

export const reportPost = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    const post = await Post.findById(id);

    const report = new Report({
      id,
      reason,
      name: post.name,
      profilePic: post.profilePic,
      email: post.email,
      image: post.image,
      tags: post.tags,
      title: post.title,
      message: post.message,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(409).json({ error: "Error while reporting that post" });
    console.log(error);
  }
};

export default router;
