const mongoose = require('mongoose');

// THIS IS A BASE SCHEMA - INHERITED BY ALL OTHER USER TYPES

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    activation: {
        activated: {type: Boolean, default: false},
        code: {type: String},
    }
});

module.exports = mongoose.model('User', UserSchema);
