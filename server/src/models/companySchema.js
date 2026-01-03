import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    nameKey: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // Cloudinary logo data
    logo: {
      url: {
        type: String,
        default: null
      },
      publicId: {
        type: String,
        default: null
      }
    }
  },
  {
    timestamps: true
  }
);

const companyModel = mongoose.models.company || mongoose.model("company", companySchema);

export default companyModel;
