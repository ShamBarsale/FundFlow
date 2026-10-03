const Campaign = require("../models/Campaign");

// POST /api/campaigns  (NGO only)
const createCampaign = async (req, res) => {
  try {
    const { title, description, category, goalAmount, imageUrl, endDate } =
      req.body;

    if (!title || !description || !category || !goalAmount || !endDate) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const campaign = await Campaign.create({
      title,
      description,
      category,
      goalAmount,
      imageUrl,
      endDate,
      ngo: req.user._id,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/campaigns  (public, approved campaigns only)
const getApprovedCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "approved" })
      .populate("ngo", "name")
      .sort({ createdAt: -1 });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/campaigns/my  (NGO only, their own campaigns)
const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ ngo: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/campaigns/:id  (public, one approved campaign)
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "ngo",
      "name"
    );

    if (!campaign || campaign.status !== "approved") {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCampaign,
  getApprovedCampaigns,
  getMyCampaigns,
  getCampaignById,
};