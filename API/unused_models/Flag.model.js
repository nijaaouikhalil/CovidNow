const mongoose = require('mongoose');

const FlagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    prority: { type: String, required: true },
    owner: { type: String, required: true }
});


module.exports = mongoose.model('Flag', FlagSchema);