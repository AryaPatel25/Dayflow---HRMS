import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  changePassword
} from "../controllers/userController.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", auth, getMyProfile);
router.patch("/me", auth, updateMyProfile);

router.patch("/change-password", auth, changePassword);

export default router;
