const Shelter = require("../models/Shelter.model");

// Approve/Reject Shelter
exports.approveShelter = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "approved" or "rejected"

  try {
    const shelter = await Shelter.findById(id);

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found." });
    }

    shelter.status = status;
    await shelter.save();

    res.status(200).json({ message: `Shelter ${status} successfully.` });
  } catch (error) {
    console.error("Error updating shelter status:", error);
    res.status(500).json({ message: "Server error." });
  }
};
