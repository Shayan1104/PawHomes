const Shelter = require("../models/Shelter.model");
const bcrypt = require("bcrypt");


const getUnapprovedShelters = async (req, res) => {
  try {
    const unapprovedShelters = await Shelter.find({ isApproved: false });
    console.log("Data agya", unapprovedShelters)
    res.status(200).json({ success: true, data: unapprovedShelters });
  } catch (error) {
    console.error("Error fetching unapproved shelters:", error);
    console.log("Data nahi ayya", error)
    res.status(500).json({ success: false, message: "Failed to fetch shelters." });
  }
};

const registerShelter = async (req, res) => {
  try {
    console.log("Received body:", req.body); // 🛠 Debug log for form data
    console.log("Received file:", req.file); // 🛠 Debug log for file upload

    const { name, location, description, email, password, contact, operatinghours } = req.body;

    // Check if email already exists
    const existingShelter = await Shelter.findOne({ email });
    if (existingShelter) {
      return res.status(400).json({ success: false, message: "Email is already registered." });
    }

    const verificationDocument = req.file ? req.file.path : "";

    // Ensure the request contains the logged-in user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "User authentication required." });
    }

    // Create a new shelter linked to the user
    const newShelter = new Shelter({
      name,
      location,
      description,
      email,
      password,
      contact,
      operatinghours,
      verificationDocument,
      role: "shelterAdmin",
      isApproved: false,
      user: req.user.id,  // ✅ Link shelter to the user who registered it
    });

    console.log("Data from backend:", newShelter);

    await newShelter.save();
    res.status(201).json({ success: true, message: "Shelter registered successfully. Awaiting approval." });
  } catch (error) {
    console.error("Error registering shelter:", error);
    res.status(500).json({ success: false, message: "Failed to register shelter." });
  }
};
// Approve Shelter
const approveShelter = async (req, res) => {
  try {
    const shelterId = req.params.id;
    const shelter = await Shelter.findById(shelterId);
    
    if (!shelter) {
      return res.status(404).json({ success: false, message: "Shelter not found" });
    }

    shelter.status = "approved"; // ✅ Update status instead of using `isApproved`
    await shelter.save();

    res.status(200).json({ success: true, message: "Shelter approved successfully", shelter });
  } catch (error) {
    console.error("Approval Error:", error);
    res.status(500).json({ success: false, message: "Failed to approve shelter" });
  }
};
const rejectShelter = async (req, res) => {
  try {
    const shelterId = req.params.id;
    const { rejectionReason } = req.body; // Get reason from request

    const shelter = await Shelter.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ success: false, message: "Shelter not found" });
    }

    shelter.status = "rejected"; // ✅ Set status instead of deleting
    shelter.rejectionReason = rejectionReason || "No reason provided";
    await shelter.save();

    res.status(200).json({ success: true, message: "Shelter rejected successfully" });
  } catch (error) {
    console.error("Rejection Error:", error);
    res.status(500).json({ success: false, message: "Failed to reject shelter" });
  }
};



module.exports = {
  getUnapprovedShelters,
  registerShelter,
  approveShelter,
  rejectShelter
};
