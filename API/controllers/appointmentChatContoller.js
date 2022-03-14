const db = require("../models");
const nodemailer = require("./mailController");
const { authJwt } = require("../middlewares");
const Appointment = db.appointments;
const User = db.user;

exports.makeAppointment = async (req,res) => {
    try{
        User.findOne({email: req.body.patientEmail}).then(async (user) => {
            if(!user){//no such email for a patient
                res.send("No patient with such email, please check the patient's email you want.")
            }
            else{
                [authJwt.isMyPatient];
                //get patient id
                const appoint = new Appointment({ //Create a variable to store the entered info
                doctorId: req.userId,
                //patientId: req.patientId,
                appointmentDate: req.body.appointmentDate,
                description: req.body.description,
                });
                appoint.save((err, user) => { //save in db
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    nodemailer.makeAppointment(/*add the name and email using id*/)
                    res.send("Appointment booked successfully");
                });
            }
        });
    }   
    catch (err) {
        res.send({ message: e });
    }

}