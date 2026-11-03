const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    type: { type: String, required: true }, // Example: Dog, Cat
    gender:{type: String, required: true},
    description: { type: String },
    image: { type: String }, // Store image URL or path
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shelterAdmin", // Reference to the shelter admin
      required: true,
    },
    adoptionStatus: {
      type: String,
      enum: ["Available", "Adopted", "Pending"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
