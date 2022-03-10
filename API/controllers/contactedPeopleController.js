const db = require("../models");
const nodemailer = require("./mailController");
const User = db.user;
const Contacted = db.contacted;

exports.contactedPerson = (req,res) => {
  try {
    const contactedPerson = new Contacted({ //Create a variable to store the entered info
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
    });
      User.findOne({email: contactedPerson.email/*, phone: contactedPerson.phone*/}).then(async (user) => { //checking the db of patients
          if(!user) { //user not there
            nodemailer.contactedPeopleEmailToSignUp(contactedPerson.name, contactedPerson.email);
            Contacted.findOne({email: contactedPerson.email/*, phone: contactedPerson.phone*/}).then(async (contacted) => { //searching if already in the contacted sick people db
              if(!contacted){ //not there
                contactedPerson.save((err, contacted) => { //save in db
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  res.send("Person is added successfully");
                });
              }
            });
          }
          else{ //incase in patients already
            console.log("ok");
            if(user.covidStatus=="Negative"){
              console.log("in");
              user.covidStatus="Pending";
              /*user.save((err, user) => { //save in db
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send("db updated");
            });*/
          }
            //covidStatus positive negative pending if negative change to pending
          }
        });
  }
  catch (e) {
    res.send({message: e});
  }

}