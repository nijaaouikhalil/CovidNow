const mongoose = require('mongoose');
const User = require('./User.model.js');

const ImmigrationOfficerSchema = new mongoose.Schema({
    governmentID: {
        type: Number,
        required: true
    },
});


module.exports = User.discriminator('ImmigrationOfficer', ImmigrationOfficerSchema);