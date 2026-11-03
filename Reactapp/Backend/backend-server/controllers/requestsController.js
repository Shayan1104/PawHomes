const Shelter = require("../models/Shelter.model");
const AdoptionRequest = require("../models/adoptionRequest.model");

//Get Shelter Registration Status
const getShelterStatus = async (req, res) => {
  try {
    const shelterRequest = await Shelter.findOne({ user: req.user.id });
    console.log("User in request:", req.user);
    if (!shelterRequest) {
      return res.status(404).json({ message: "No shelter registration found." });
    }

    res.status(200).json({
      status: shelterRequest.status,
      rejectionReason: shelterRequest.status === "rejected" ? shelterRequest.rejectionReason : null,
      submittedAt: shelterRequest.createdAt,
    });
  } catch (error) {
    console.error("Error fetching shelter request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Adoption Requests Status
const getAdoptionStatus = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.find({ user: req.user.id }).populate("pet", "name");
    console.log("User in request:", req.user);
    if (!adoptionRequests.length) {
      return res.status(404).json({ message: "No adoption requests found." });
    }

    res.status(200).json(
      adoptionRequests.map((request) => ({
        petName: request.pet.name,
        status: request.status, // pending, accepted, rejected
        rejectionReason: request.status === "rejected" ? request.rejectionReason : null,
        submittedAt: request.createdAt,
      }))
    );
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getShelterStatus, getAdoptionStatus };
