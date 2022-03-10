const db = require("../models");
const User = db.user;
const Contacted = db.contacted;

exports.contactedPerson = (req,res) => {
  try {
    const contactedPerson = new Contacted({
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        // Add contacted if contacted later so we dont contact several times
    });
      User.findOne({email: contactedPerson.email, phone: contactedPerson.phone}).then(async (user) => {
          if(!user) {
            Contacted.findOne({email: contactedPerson.email, phone: contactedPerson.phone}).then(async (contacted) => {
              if(!contacted){
              contactedPerson.save((err, contacted) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
              });
              }
            });
          }
        });
  }
  catch (e) {
    res.send({message: e});
  }

}