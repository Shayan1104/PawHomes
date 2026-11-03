const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    let user = await User.findOne({ _id: decoded.id }).select("-password");

    if (!user) {
      const Shelter = require("../models/Shelter.model"); // Import only if needed
      user = await Shelter.findOne({ _id: decoded.id }).select("-password");
    }

    if (!user) {
      return res.status(401).json({ message: "User not found in database" });
    }

    req.user = { id: decoded.id, role: decoded.role }; // Assign role properly
    console.log("Assigned User in Middleware:", req.user);

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
const isAdmin = (req, res, next) => {
  // Ensure that the user has an 'admin' role
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();  // Proceed to next middleware or route handler
};
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  console.log("Auth Header:", token); // Debugging

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    req.user = await User.findById(decoded.id).select("-password");
    console.log("Assigned User in Middleware:", req.user); // Debugging

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isShelterAdmin = (req, res, next) => {
  console.log("Decoded User in isShelterAdmin:", req.user); // Debug log

  if (!req.user || req.user.role !== "shelterAdmin") {
    return res.status(403).json({ message: "Access denied. Shelter role required." });
  }

  next();
};

module.exports = {
  isAdmin,
  verifyToken,
  isShelterAdmin,
  authMiddleware,
  protect,
};
