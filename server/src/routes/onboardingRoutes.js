import express from "express";
import upload from "../middlewares/upload.js";
import auth from "../middlewares/auth.js";
import { completeOnboarding } from "../controllers/onboardingController.js";

const router = express.Router();

router.post(
  "/",
  auth,
  upload.single("avatar"),
  completeOnboarding
);

router.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  completeOnboarding
);

export default router;
