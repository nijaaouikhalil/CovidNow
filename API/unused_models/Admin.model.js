const mongoose = require('mongoose');
const User = require('./User.model.js');

const AdminSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: false
    },
});


module.exports = User.discriminator('Admin', AdminSchema);
