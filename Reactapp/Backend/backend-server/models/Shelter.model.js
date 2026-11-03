const mongoose = require("mongoose");

const ShelterSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  email: String,
  password: String,
  contact: String,
  operatinghours: String,
  verificationDocument: String,
  role: { type: String, default: "shelterAdmin" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // ✅ Track status
  rejectionReason: { type: String, default: "" }, // ✅ Store reason for rejection
});

module.exports = mongoose.model("Shelter", ShelterSchema);
