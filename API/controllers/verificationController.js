const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.verifyRole = (req, res) => {
  User.findOne({
    _id: req.body.id,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let msg = "";
    if (req.body.decision) {
      user.verified = "Active";
      msg = " Account was Actived!";
    } else {
      user.verified = "Denied";
      msg = " Account was Denied!";
    }
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({
        message: user.name + msg,
      });
    });
  });
};

exports.roleInformation = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    Role.findOne(
      {
        _id: user.roles,
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        const userRole = role.name;

        //request info dependent on role
        if (userRole == "doctor") {
          // Start of address request
          user.doctorInfo.location.address1 = req.body.address1;
          user.doctorInfo.location.address2 = req.body.address2;
          user.doctorInfo.location.city = req.body.city;
          user.doctorInfo.location.postalCode = req.body.postalCode;
          user.doctorInfo.location.province = req.body.province;
          // End of address request

          user.doctorInfo.licenseNumber = req.body.licenseNumber;
        } else if (userRole == "health_official") {
          user.healthOfficialInfo.healthOfficialID = req.body.healthOfficialID;
        } else if (userRole == "immigration_officer") {
          user.governmentOfficialInfo.governmentID = req.body.governmentID;
        }

        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({
            message: "Succesfully submitted your information",
            user: user,
          });
        });
      }
    );
  });
};

exports.getPendingList = (req, res) => {
  User.find(
    {
      verified: "Pending",
    },
    "name lname email roles verified"
  ).exec(async (err, cursor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    await cursor.forEach((doc, index) => {
      Role.findOne(
        {
          _id: doc["roles"],
        },
        "name"
      ).exec((err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        doc["roles"] = role;

        if (index == cursor.length - 1) {
          res.send(cursor);
        }
      });
    });
  });
};
