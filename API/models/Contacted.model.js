const mongoose = require("mongoose");

const Contacted = mongoose.model(
  "Contacted People",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    contacted: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  })
);

module.exports = Contacted;