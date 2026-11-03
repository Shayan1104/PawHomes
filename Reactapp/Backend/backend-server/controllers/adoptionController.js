const AdoptionRequest = require("../models/adoptionRequest.model");

const createAdoptionRequest = async (req, res) => {
  try {
    console.log("User making request:", req.user); // Debugging log

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const {
      adopterName,
      contactNo,
      email,
      cnic,
      residentialAddress,
      pet,
      hadPetsBefore,
      whereAreTheyNow,
      primaryVet,
      vetContact,
      familyAllergic,
      permissionFromHousehold,
      indoorOutdoor
    } = req.body;

    if (!pet) {
      return res.status(400).json({ message: "Pet ID is required" });
    }

    // Ensure all required fields are provided
    if (!hadPetsBefore || !primaryVet || !familyAllergic || !permissionFromHousehold || !indoorOutdoor) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newAdoptionRequest = new AdoptionRequest({
      user: req.user._id, // Fix the incorrect field
      adopterName,
      contactNo,
      email,
      cnic,
      residentialAddress,
      pet,
      hadPetsBefore,
      whereAreTheyNow,
      primaryVet,
      vetContact,
      familyAllergic,
      permissionFromHousehold,
      indoorOutdoor,
    });

    await newAdoptionRequest.save();
    res.status(201).json({ message: "Adoption request submitted successfully" });
  } catch (error) {
    console.error("Error in adoption request:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAdoptionRequests = async (req, res) => {
  try {
    if (req.user.role !== "shelterAdmin") {
      return res.status(403).json({ message: "Access denied." });
    }

    // Find adoption requests only for the shelter's listed pets
    const requests = await AdoptionRequest.find({}).populate({
      path: "pet",
      match: { shelter: req.user._id }, // Ensures only this shelter's pets are included
      select: "name age",
    }).populate("user", "name email");

    // Filter out adoption requests where pet is null after matching
    const filteredRequests = requests.filter(request => request.pet !== null);

    res.status(200).json(filteredRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch adoption requests", error });
  }
};

module.exports = { createAdoptionRequest, getAdoptionRequests };
