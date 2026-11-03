const express = require("express");
const { registerShelter, getUnapprovedShelters, approveShelter, rejectShelter } = require("../controllers/shelterController");
const { verifyToken, isAdmin, authMiddleware } = require("../middlewares/authMiddle");
const multer = require("multer");

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Register shelter route (protected)
router.post("/registeryourshelter", verifyToken, upload.single("verificationDocument"), registerShelter);
// Get unapproved shelters (only accessible by admin)
router.get("/unapproved-shelters", getUnapprovedShelters);
router.put("/approve-shelter/:id", authMiddleware, approveShelter);
router.delete("/reject-shelter/:id", authMiddleware, rejectShelter);

module.exports = router;
