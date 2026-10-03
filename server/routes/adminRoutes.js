const express = require("express");
const {
  getPendingCampaigns,
  approveCampaign,
  rejectCampaign,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// Every admin route needs a login token AND the admin role
router.use(protect, adminOnly);

router.get("/campaigns/pending", getPendingCampaigns);
router.put("/campaigns/:id/approve", approveCampaign);
router.put("/campaigns/:id/reject", rejectCampaign);

module.exports = router;