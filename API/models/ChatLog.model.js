const mongoose = require('mongoose');

const ChatLogSchema = new mongoose.Schema({
    data: [{
        message: {type: String},
        priority: {type: String},
        sender: {type: String},
        date: {type: Date},
    }],
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }
});


module.exports = mongoose.model('ChatLog', ChatLogSchema);