const mongoose = require("mongoose");

const Report = mongoose.model(
  "Report",
  new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    questions: {
          hasCovid: { type: Boolean, sparse: true },
          hasTravelled: { type: Boolean, sparse: true },
          hasCovid: { type: Boolean, sparse: true },
          hasAutoImmuneDisease : { type: Boolean, sparse: true },
          isPregnant : { type: Boolean, sparse: true }, 
          hadAllergicReaction: { type: Boolean, sparse: true },
    },
    date: {
        type: Date,
        default: Date.now,
      },
  })
);

module.exports = Report;