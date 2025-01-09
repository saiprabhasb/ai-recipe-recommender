const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, // Stored as plain text (not recommended for production)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
