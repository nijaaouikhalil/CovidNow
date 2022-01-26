const mongoose = require('mongoose');
const User = require('./User.model.js');

const ImmigrationOfficerSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: false
    },
});


module.exports = User.discriminator('ImmigrationOfficer', ImmigrationOfficerSchema);