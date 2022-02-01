const mongoose = require('mongoose');
const User = require('./User.model.js');
const objectID = mongoose.Schema.Types.ObjectId

const PatientSchema = new mongoose.Schema({
    healthcardnumber: {
        type: Number,
        required: true
    },
    dateofbirth: {
        type: Date,
        required: true
    },
    address: {
        street1: {type: String, required: true},
        street2: {type: String, required: false},
        city: {type: String, required: true},
        province: {type: String, required: true},
        postcode: {type: String, required: true},
    },
    confirmed: {type: Boolean, required: true},
    doctor: {type: objectID, ref: 'Doctor'},
    inbox: [{type: objectID, ref: 'ChatLog'}],
    appointments: [{type: objectID, ref: 'Appointment'}],
    records: [{type: objectID, ref: 'PatientRequirement'}],
    flags: [{type: objectID, ref: 'Flag'}],
    vaccines: [{type: objectID, ref: 'Vaccine'}],
});


module.exports = User.discriminator('Patient', PatientSchema);