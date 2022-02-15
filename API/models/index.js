const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./Register.model")
db.role = require("./Role.model")
db.assignedDoctor = require("./assignedDoctor.model")

db.ROLES = ["user", "admin"]

module.exports = db;

