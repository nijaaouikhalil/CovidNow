const mongoose = require("mongoose");

const assignedDoctor = mongoose.model(
  "assignedDoctor",
  new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },  
  })
);

module.exports = assignedDoctor;