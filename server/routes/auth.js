import express from "express";
import { login, signup, reset, changepw } from "../controllers/auth.js";

const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/reset", reset);
router.post("/reset/:userId/:token", changepw);

export default router;
