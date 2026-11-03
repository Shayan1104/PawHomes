const express = require("express");
const {
  approveShelter,
} = require("../controllers/adminController");
const {
  getUnapprovedShelters
} = require("../controllers/shelterController");
const { adminAuthMiddleware } = require("../middlewares/adminAuthMiddleware");
const Shelter = require("../models/Shelter.model");
const router = express.Router();

// Get all unapproved shelters
router.get("/unapproved-shelters", adminAuthMiddleware, getUnapprovedShelters);

// Approve a shelter by ID
router.put("/shelters/:id/approve", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedShelter = await Shelter.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );
    if (!updatedShelter) {
      return res.status(404).json({ success: false, message: "Shelter not found" });
    }
    res.status(200).json({ success: true, message: "Shelter Approved" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error approving shelter" });
  }
});

// Reject a shelter by ID
router.delete("/shelters/:id/reject", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShelter = await Shelter.findByIdAndDelete(id);
    if (!deletedShelter) {
      return res.status(404).json({ success: false, message: "Shelter not found" });
    }
    res.status(200).json({ success: true, message: "Shelter Rejected" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error rejecting shelter" });
  }
});

// Get admin profile
router.get("/admin-profile", adminAuthMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching admin profile" });
  }
});

// Approve shelter using controller
router.put("/approveshelter/:id", adminAuthMiddleware, approveShelter);

module.exports = router;
