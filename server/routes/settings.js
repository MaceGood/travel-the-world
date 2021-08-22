import express from "express";
import {
  changeEmail,
  changePassword,
  changeName,
} from "../controllers/settings.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.patch("/change-email/:id", auth, changeEmail);
router.patch("/change-password/:id", auth, changePassword);
router.patch("/change-name/:id", auth, changeName);

export default router;
