import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";
import Token from "../models/token.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";

const router = express.Router();

const secret = "maceProekt";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (validateEmail(email) === false)
      return res.status(400).json({ error: "Please enter a valid email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User doesn't exist" });

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      secret
      // { expiresIn: "365d" }
    );
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ error: "User with that email already exists" });

    if (validateEmail(email) === false)
      return res.status(400).json({ error: "Please enter a valid email" });

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      secret
      // { expiresIn: "365d" }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

export const reset = async (req, res) => {
  const { email } = req.body;
  try {
    if (validateEmail(email) === false)
      return res.status(400).json({ error: "Please enter a valid email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User doesn't exist" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `http://localhost:3000/auth/reset/${user._id}/${token.token}`;
    const result = await sendEmail(user.email, link);

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const changepw = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { userId: _id, token } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ error: "Id is not valid" });

    const user = await User.findById(_id);
    if (!user)
      return res.status(400).json({ error: "Invalid link or expired" });

    const tokens = await Token.findOne({
      userId: user._id,
      token,
    });
    if (!tokens)
      return res.status(400).json({ error: "Invalid link or expired" });

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.findByIdAndUpdate(
      _id,
      { password: hashedPassword },
      { new: true }
    );
    await tokens.delete();

    res.status(200).json({ result, tokens });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    next(error);
  }
};

export default router;
