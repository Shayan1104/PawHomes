const Shelter = require('../models/Shelter.model');

const registerShelter = async (req, res) => {
    try {
        const verificationDocument = req.file ? req.file.path : "";
        const { name, location, description, email, password } = req.body;

        // ... (validation - VERY IMPORTANT)

        const newShelter = new Shelter({
            name,
            location,
            description,
            email,
            password, // Hashing handled in the model
            verificationDocument,
            user: req.user._id, // Link to the logged-in user
            role: "shelterAdmin",
            isApproved: false, // Pending approval
        });

        await newShelter.save();

        res.status(201).json({ message: 'Shelter registration submitted. Awaiting approval.' });
    } catch (error) {
        // ... (improved error handling)
    }
};

module.exports = { registerShelter };