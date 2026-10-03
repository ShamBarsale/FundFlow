const express = require("express");
const {
  makeDonation,
  getMyDonations,
} = require("../controllers/donationController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("donor"), makeDonation);
router.get("/my", protect, authorize("donor"), getMyDonations);

module.exports = router;