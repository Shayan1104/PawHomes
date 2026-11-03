const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Your User model
const Shelter = require('../models/Shelter.model')
//Sign up
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role });
  
      return res.status(201).json({ message: 'User successfully registered', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Login Function

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check in User Model
  let user = await User.findOne({ email });

  // If not found in Users, check in Shelter Model
  if (!user) {
    user = await Shelter.findOne({ email });

    // If user is a shelter but not approved, reject login
    if (user && !user.isApproved) {
      return res.status(403).json({ message: "Shelter is not approved yet. Please wait for admin approval." });
    }
  }

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  if (user.role === "shelterAdmin" && !user.isApproved) {
    return res.status(403).json({ message: "Shelter is not approved yet. Please wait for admin approval." });
  }
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role }, // Include role in token
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  
  res.json({ token, role: user.role });
};