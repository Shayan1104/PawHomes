const mongoose = require("mongoose");

const adoptionRequestSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet", // Reference to the Pet model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  adopterName: { type: String, required: true },
  contactNo: { type: String, required: true },
  secondaryContact: { type: String },
  cnic: { type: String, required: true },
  email: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  hadPetsBefore: { type: String, required: true },
  whereAreTheyNow: { type: String },
  primaryVet: { type: String, required: true },
  vetContact: { type: String },
  familyAllergic: { type: String, required: true },
  permissionFromHousehold: { type: String, required: true },
  indoorOutdoor: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("AdoptionRequest", adoptionRequestSchema);
