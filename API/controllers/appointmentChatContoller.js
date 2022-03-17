const db = require("../models");
const nodemailer = require("./mailController");
//const { authJwt } = require("../middlewares");
const Appointment = db.appointments;
const User = db.user;

exports.makeAppointment = async (req,res) => {
    try{
        User.findOne({_id: req.body.userId}).then(async (user) => {
            if(!user){//no such email for a patient
                res.send("No patient with such email, please check the patient's email you want.")
            }
            else{
                //[authJwt.isMyPatient];
                //get patient id
                const appoint = new Appointment({ //Create a variable to store the entered info
                doctorId: req.userId,
                patientId: req.body.userId,
                appointmentDate: new Date(req.body.appointmentDate),
                description: req.body.description,
                });
                appoint.save((err) => { //save in db
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                });
                nodemailer.makeAppointment(user.name, user.email)
                res.send("Appointment booked successfully");
            }
        });
    }   
    catch (err) {
        res.send({ message: e });
    }


    
}
exports.appointmentsWithPatients = async (req,res) => {
    Appointment.find({doctorId: req.userId}).then(async (doctor) => {
        res.send(doctor);
    });
}