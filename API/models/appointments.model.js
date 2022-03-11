const mongoose = require("mongoose");

const appointments = mongoose.model(
  "appointments",
  new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    Email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    appointmentDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Soon", "Done", "Cancelled", "Postponed"],
        default: "Soon",
    }
  })
);

module.exports = appointments;