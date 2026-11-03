const Pet = require("../models/Pets.model");

// Add a new pet (Only Shelter Admins)
const addPet = async (req, res) => {
  console.log("Received request to add pet");
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);
  console.log("Requesting User:", req.user); // Log the user

  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (req.user.role !== "shelter" && req.user.role !== "shelterAdmin") {
      return res.status(403).json({ message: "Only shelters can add pets" });
    }

    const { name, age, type, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !age || !image || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    console.log("Assigned Shelter ID:", req.user.id);
    const newPet = new Pet({
      name,
      age,
      type,
      description,
      image,
      shelter: req.user.id,
      adoptionStatus: "Available", // Ensure default is always set
    });
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully", pet: newPet });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { addPet };
