const mongoose = require('mongoose');
const User = require('./User.model.js');

const HealthOfficialSchema = new mongoose.Schema({
    governmentID: {
        type: Number,
        required: true
    },
});

module.exports = User.discriminator('HealthOfficial', HealthOfficialSchema);