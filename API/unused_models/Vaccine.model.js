const mongoose = require('mongoose');

const VaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    },
    datereceived: { type: Date, required: true },
    dosenumber: { type: Number, required: true }
});


module.exports = mongoose.model('Vaccine', VaccineSchema);