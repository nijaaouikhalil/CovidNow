const mongoose = require("mongoose");

const communication = mongoose.model(
  "communication",
  new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    sendersId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now,
    },   
  })
);

module.exports = communication;