import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  sendResetOtp,
  resetPassword,
  isAuthenticated
} from "../controllers/authController.js";
import upload from "../middlewares/upload.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("logo"),
  register
);
router.post("/login", login);
router.post("/logout", auth, logout);

router.get("/me", auth, isAuthenticated);

router.post("/send-verify-otp", auth, sendVerifyOtp);
router.post("/verify-email", auth, verifyEmail);

router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;