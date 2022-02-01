const mongoose = require('mongoose');
const User = require('./User.model.js');

const DoctorSchema = new mongoose.Schema({
    licensenumber: {
        type: Number,
        required: true
    },
    address: {
        street1: {type: String, required: true},
        street2: {type: String, required: false},
        city: {type: String, required: true},
        province: {type: String, required: true},
        postcode: {type: String, required: true},
    },
    patients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}],
    inbox: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatLog'}],
    appointments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}]
});


module.exports = User.discriminator('Doctor', DoctorSchema);