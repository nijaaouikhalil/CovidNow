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
          Temperature: { type: Number, sparse: true },
          Weight: { type: Number, sparse: true },
          Height: { type: Number, sparse: true },
          customQ: { type: String, sparse: true },
          customAns: { type: String, sparse: true },
    },
    date: {
        type: Date,
        default: Date.now,
      },
  })
);

module.exports = Report;