const express = require("express");
const mongoose = require('mongoose');
const { addPet } = require("../controllers/petController");
const { verifyToken, isShelterAdmin } = require("../middlewares/authMiddle");
const Pet = require("../models/Pets.model")
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // 🛠 Make sure this folder exists!
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

 
const upload = multer({ storage });

// Shelter Admin adds a new pet
router.post("/add", verifyToken, upload.single("image"), addPet);
router.get("/all", async (req, res) => {
  try {
    const pets = await Pet.find(); // Fetch all pets from DB
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets", error });
  }
});
router.get("/search", async (req, res) => {
  try {
    
    const { petType, age, area } = req.query;
    let filter = {};
    if (petType) filter.type = petType; 

    // Convert age range (e.g., "0-6") to MongoDB query
    if (age) {
      const [min, max] = age.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filter.age = { $gte: min, $lte: max }; // Search for pets within the age range
      }
    }

    if (area) filter.area = { $regex: new RegExp(area, "i") };
    const pets = await Pet.find(filter);
    res.status(200).json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // ✅ Validate if the ID is a proper MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid pet ID format" });
  }

  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    console.error("Error fetching pet details:", error);
    res.status(500).json({ message: "Error fetching pet details", error: error.message });
  }
});
module.exports = router;
