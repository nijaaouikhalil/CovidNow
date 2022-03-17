const mongoose = require("mongoose");

const appointments = mongoose.model(
  "appointments",
  new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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