const express = require("express");
const { getShelterStatus, getAdoptionStatus } = require("../controllers/requestsController");
const { protect } = require("../middlewares/authMiddle");

const router = express.Router();

router.get("/shelter-status", protect, getShelterStatus);
router.get("/adoption-status", protect, getAdoptionStatus);

module.exports = router;
