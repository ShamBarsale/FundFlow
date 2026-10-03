const express = require("express");
const {
  createCampaign,
  getApprovedCampaigns,
  getMyCampaigns,
  getCampaignById,
} = require("../controllers/campaignController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getApprovedCampaigns);
router.post("/", protect, authorize("ngo"), createCampaign);

// This must stay above "/:id", otherwise "my" is treated as an id
router.get("/my", protect, authorize("ngo"), getMyCampaigns);

router.get("/:id", getCampaignById);

module.exports = router;