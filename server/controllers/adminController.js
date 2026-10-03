const Campaign = require("../models/Campaign");

// GET /api/admin/campaigns/pending
const getPendingCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "pending" })
      .populate("ngo", "name email")
      .sort({ createdAt: -1 });

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/campaigns/:id/approve
const approveCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaign.status = "approved";
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/campaigns/:id/reject
const rejectCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaign.status = "rejected";
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPendingCampaigns, approveCampaign, rejectCampaign };