const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./Register.model")
db.role = require("./Role.model")
db.assignedDoctor = require("./assignedDoctor.model")
db.report = require("./Report.model")
db.contacted = require("./Contacted.model")
db.appointments = require ("./appointments.model")
db.communication = require("./communication.model")

db.ROLES = ["user", "admin"]

module.exports = db;

