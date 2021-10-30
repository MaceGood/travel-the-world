import express from "express";
import bcrypt from "bcrypt";
import User from "../models/auth.js";
import mongoose from "mongoose";

const router = express.Router();

const secret = "maceProekt";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const changeEmail = async (req, res) => {
  const { email } = req.body;
  const { id: _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User does not exist" });

    const result = await User.findByIdAndUpdate(
      _id,
      { email: email },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { id: _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User does not exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.findByIdAndUpdate(
      _id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const changeImage = async (req, res) => {
  const { image } = req.body;
  const { id: _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User does not exist" });

    const result = await User.findByIdAndUpdate(
      _id,
      { imageUrl: image },
      { new: true }
    );

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

export const changeName = async (req, res) => {
  const { name } = req.body;
  const { id: _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User does not exist" });

    const result = await User.findByIdAndUpdate(
      _id,
      { name: name },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default router;
