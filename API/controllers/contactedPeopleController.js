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
        contactedBy: req.userId
    });
      User.findOne({email: contactedPerson.email}).then(async (user) => { //checking the db of patients
          if(!user) { //user not there
            nodemailer.contactedPeopleEmailToSignUp(contactedPerson.name, contactedPerson.email);
            Contacted.findOne({email: contactedPerson.email}).then(async (contacted) => { //searching if already in the contacted sick people db
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
            if(user.covidStatus==="Negative"){
              user.covidStatus="Pending";
              user.save((err, user) => { //save in db
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send("db updated");
            });
          }
          }
        });
  }
  catch (e) {
    res.send({message: e});
  }

}

exports.contactedPeopleList = (req, res) => {
  try{
    Contacted.find({contactedBy: req.userId}).then(async (contactedList) => {//check if the user has already entered a list of contacted
      if(contactedList===null){
        res.send("The patient did not report any contacted people.");
      }
      else{
        res.send(contactedList);
      }
    })

  }
  catch (err) {
    res.send({message: err});
  }
}