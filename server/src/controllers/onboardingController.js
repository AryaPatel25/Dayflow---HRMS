import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary.js";
import userModel from "../models/userSchema.js";

export const completeOnboarding = async (req, res, next) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const file = req.file;
  const userId = req.user.id;

  try {
    if (!file) {
      throw createHttpError(400, "Profile image is required");
    }

    if (!file.mimetype.startsWith("image/")) {
      throw createHttpError(400, "Only image files are allowed");
    }

    const user = await userModel.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const folder =
      user.role === "ADMIN"
        ? "admin-profileImages"
        : "employee-profileImages";

    const imagePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      file.filename
    );

    let uploadedImage;

    try {
      uploadedImage = await cloudinary.uploader.upload(imagePath, {
        folder,
        public_id: file.filename,
        format: file.mimetype.split("/")[1],
        transformation: [
          { width: 300, height: 300, crop: "fill", gravity: "face" }
        ]
      });
    } catch {
      throw createHttpError(500, "Failed to upload profile image");
    }

    if (user.profileImage?.publicId) {
      await cloudinary.uploader.destroy(user.profileImage.publicId);
    }

    user.profileImage = {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id
    };

    user.mustChangePassword = false;

    await user.save();

    try {
      await fs.promises.unlink(imagePath);
    } catch {
      console.warn("Failed to delete temp upload file");
    }

    return res.json({
      success: true,
      message: "Profile setup completed successfully"
    });

  } catch (error) {
    next(error);
  }
};
