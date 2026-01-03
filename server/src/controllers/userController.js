import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import userModel from "../models/userSchema.js";

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw createHttpError(400, "Both passwords are required");
    }

    const user = await userModel.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw createHttpError(401, "Incorrect current password");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.mustChangePassword = false;

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};
