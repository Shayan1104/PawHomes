const express = require("express");
const { createAdoptionRequest, getAdoptionRequests } = require("../controllers/adoptionController");
const { isShelterAdmin, protect} = require("../middlewares/authMiddle");
const router = express.Router();

// Route to create a new adoption request
router.post("/adopt-request", protect, createAdoptionRequest); 

// Route to fetch all adoption requests (Admin access)
router.get("/adoption-requests", protect, isShelterAdmin, getAdoptionRequests);

module.exports = router;
