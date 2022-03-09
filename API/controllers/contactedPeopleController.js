const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Contacted = db.Contacted;

exports.contactedPerson = (req,res) => {
try {
    const contactedPerson = new Contacted({
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        // Add contacted if contacted later so we dont contact several times
        // Add test Result if found later in the tables of patients
    });
      User.findOne({email: contactedPerson.email, phone: contactedPerson.phone}).then(async (user) => {
          if(!user) {
            contactedPerson.save((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
          });
        }
        });
}
catch (e) {
    res.send({message: e});
}

}