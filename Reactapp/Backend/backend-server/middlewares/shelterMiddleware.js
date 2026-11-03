const Shelter = require("../models/Shelter.model");

// Middleware to Check Shelter Approval
exports.checkShelterApproval = async (req, res, next) => {
  const userId = req.user._id; // User ID from token

  try {
    const shelter = await Shelter.findOne({ email: req.user.email });

    if (!shelter || shelter.status !== "approved") {
      return res.status(403).json({ message: "Shelter registration not approved yet." });
    }

    next();
  } catch (error) {
    console.error("Error checking shelter approval:", error);
    res.status(500).json({ message: "Server error." });
  }
};
