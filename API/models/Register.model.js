const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
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
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
    birthday: {
      type: Date,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    covidStatus: {
      type: String,
      enum: ["Negative", "Pending", "Positive"],
      default: "Pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    verified: {
      type: String,
      enum: ["Pending", "Active", "Denied"],
      sparse: true,
    },
    doctorInfo: {
      location: {
        address1: { type: String, sparse: true },
        address2: { type: String, sparse: true },
        city: { type: String, sparse: true },
        postalCode: { type: String, sparse: true },
        province: { type: String, sparse: true },
      },
      licenseNumber: {
        type: String,
        unique: true,
        sparse: true,
      },
    },

    

    governmentOfficialInfo: {
      governmentID: {
        type: String,
        sparse: true,
      },
    },
    healthOfficialInfo: {
      healthOfficialID: {
        type: String,
        sparse: true,
      },
    },
  })
);

module.exports = User;
