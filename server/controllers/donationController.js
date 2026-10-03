const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

// POST /api/donations  (donor only)
const makeDonation = async (req, res) => {
  try {
    const { campaignId, amount, message } = req.body;

    if (!campaignId || !amount) {
      return res
        .status(400)
        .json({ message: "Campaign and amount are required" });
    }

    if (Number(amount) < 1) {
      return res.status(400).json({ message: "Minimum donation is 1" });
    }

    const campaign = await Campaign.findById(campaignId);

    if (!campaign || campaign.status !== "approved") {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (new Date(campaign.endDate) < new Date()) {
      return res.status(400).json({ message: "This campaign has ended" });
    }

    // 1. Record the donation
    const donation = await Donation.create({
      donor: req.user._id,
      campaign: campaign._id,
      amount: Number(amount),
      message,
    });

    // 2. Add the amount to the campaign's collected total
    campaign.collectedAmount += Number(amount);
    await campaign.save();

    res.status(201).json({
      donation,
      collectedAmount: campaign.collectedAmount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/donations/my  (donor only, their own donation history)
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate("campaign", "title")
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { makeDonation, getMyDonations };