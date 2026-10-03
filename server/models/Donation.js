const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Donation amount is required"],
      min: [1, "Minimum donation is 1"],
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);