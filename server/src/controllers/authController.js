import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

import cloudinary from "../config/cloudinary.js";
import companyModel from "../models/companySchema.js";
import userModel from "../models/userSchema.js";
import transporter from "../config/nodemailer.js";
import { generateLoginId } from "../utils/loginIdGenerator.js";

import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../config/emailTemplates.js";

export const register = async (req, res, next) => {
  const __filename = new URL(import.meta.url).pathname.replace(
    /^\/(\w):/,
    "$1:"
  );
  const __dirname = path.dirname(__filename);

  const { companyName, name, email, phone, password } = req.body;
  const file = req.file; // company logo

  try {
    if (!companyName || !name || !email || !phone || !password) {
      throw createHttpError(400, "Missing required details");
    }

    if (!file) {
      throw createHttpError(400, "Company logo is required");
    }

    // Validate file type
    if (!file.mimetype.startsWith("image/")) {
      throw createHttpError(
        400,
        "Only image files are allowed for company logo"
      );
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use the actual file path provided by multer
    const logoPath = file.path;

    let uploadedLogo;

    try {
      // Check if file exists before uploading
      if (!fs.existsSync(logoPath)) {
        throw new Error(`File not found at ${logoPath}`);
      }

      console.log("Uploading logo to Cloudinary:", logoPath);

      // Create unique public_id without extension to avoid double extensions
      const publicId = `${Date.now()}-${companyName
        .toLowerCase()
        .replace(/\\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}`;

      uploadedLogo = await cloudinary.uploader.upload(logoPath, {
        folder: "company-logos",
        public_id: publicId,
        resource_type: "auto",
        // Don't specify format - let Cloudinary auto-detect from file
      });

      console.log("Logo uploaded successfully:", uploadedLogo.secure_url);

      // Delete the temporary file immediately after successful upload
      try {
        await fs.promises.unlink(logoPath);
        console.log("Temporary file deleted:", logoPath);
      } catch (unlinkError) {
        console.warn("Warning: Failed to delete temp logo file", unlinkError);
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);

      // Clean up file if upload failed
      try {
        await fs.promises.unlink(logoPath);
      } catch (unlinkError) {
        console.warn(
          "Warning: Failed to delete temp logo file after upload failure",
          unlinkError
        );
      }

      throw createHttpError(
        500,
        `Failed to upload company logo: ${error.message}`
      );
    }

    const company = await companyModel.create({
      name: companyName,
      nameKey: companyName.toLowerCase().trim(),
      logo: {
        url: uploadedLogo.secure_url,
        publicId: uploadedLogo.public_id,
      },
    });

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts[1] || "";
    const yearOfJoining = new Date().getFullYear();

    const loginId = await generateLoginId({
      companyName: company.name,
      firstName,
      lastName,
      yearOfJoining,
      companyId: company._id,
    });

    const user = await userModel.create({
      companyId: company._id,
      name,
      email,
      phone,
      password: hashedPassword,
      role: "ADMIN",
      mustChangePassword: false,
      yearOfJoining,
      loginId,
    });

    const token = jwt.sign(
      {
        id: user._id,
        companyId: company._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to DayFlow Portal",
      text: `Hello ${name},

      Welcome to the DayFlow Portal!
      Your company "${companyName}" has been successfully registered.
      
      Your Login ID: ${loginId}
      
      Best regards,
      DayFlow Team`,
    });

    return res.status(201).json({
      success: true,
      companyId: company._id,
      userId: user._id,
      loginId,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Clean up uploaded file if it exists
    if (file && file.path) {
      try {
        await fs.promises.unlink(file.path);
      } catch (unlinkError) {
        console.warn("Warning: Failed to delete temp logo file", unlinkError);
      }
    }

    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return next(
      createHttpError(400, "Login ID / Email and password are required")
    );
  }

  try {
    const isEmail = identifier.includes("@");

    const user = await userModel.findOne(
      isEmail ? { email: identifier.toLowerCase() } : { loginId: identifier }
    );

    if (!user || !user.isActive) {
      throw createHttpError(401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        companyId: user.companyId,
        mustChangePassword: user.mustChangePassword,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      mustChangePassword: user.mustChangePassword,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    // 🚫 Clear auth cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account already verified",
      });
    }

    // 🔢 Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    console.log(
      `Verification OTP generated for user ${user.email}: ${otp} (expires in 15 minutes)`
    );

    // 📧 Send email
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Email Verification OTP",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      ),
    });

    return res.json({
      success: true,
      message: "Verification OTP sent to your email. Valid for 15 minutes.",
    });
  } catch (error) {
    console.error("Error sending verification OTP:", error);
    return res.json({
      success: false,
      message: "Failed to send OTP. Please try again.",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user.id;

  if (!otp) {
    return res.json({
      success: false,
      message: "OTP is required",
    });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account already verified",
      });
    }

    // Check if OTP exists
    if (!user.verifyOtp) {
      return res.json({
        success: false,
        message: "No OTP found. Please request a new verification OTP",
      });
    }

    // Check OTP expiration first
    if (user.verifyOtpExpiredAt < Date.now()) {
      // Clear expired OTP
      user.verifyOtp = "";
      user.verifyOtpExpiredAt = 0;
      await user.save();

      return res.json({
        success: false,
        message: "OTP has expired. Please request a new verification OTP",
      });
    }

    // Check OTP match
    if (user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP. Please check and try again",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;
    await user.save();

    console.log(`Email verified successfully for user: ${user.email}`);

    return res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.json({
      success: false,
      message: "Verification failed. Please try again.",
    });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      ),
    });

    return res.json({
      success: true,
      message: "Password reset OTP sent",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user || user.resetOtp !== otp || user.resetOtpExpiredAt < Date.now()) {
      return res.json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpiredAt = 0;
    user.mustChangePassword = false;

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
