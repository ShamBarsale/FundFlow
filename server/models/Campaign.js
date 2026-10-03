const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["education", "health", "environment", "food", "disaster", "other"],
    },
    goalAmount: {
      type: Number,
      required: [true, "Goal amount is required"],
      min: 1,
    },
    collectedAmount: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);