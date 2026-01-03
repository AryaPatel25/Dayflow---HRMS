import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Multi-company support
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    // Auto-generated Login ID
    loginId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    profileImage: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
    },

    password: {
      type: String,
      required: true,
    },

    // 🛡 Role (NEVER from frontend)
    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"],
      required: true,
    },

    mustChangePassword: {
      type: Boolean,
      default: true,
    },

    yearOfJoining: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Email verification fields
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpiredAt: {
      type: Number,
      default: 0,
    },

    // Password reset fields
    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpiredAt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// ---> First check that the userModel is available in the database or not if yes then use that userModel
//      Otherwise create new userModel.

export default userModel;
