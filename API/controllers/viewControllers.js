const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;
const assignedDoctor = db.assignedDoctor;

exports.assignDoctor = (req, res) => {
  //verify if doctorId is doctor role
  /*
    if(getRoleName(req.body.doctorId) != "doctor"){
        res.status(500).send({message: "Given id is not associated to a doctor"})
        return
    }
    */

  //need to verify id's
  const assign = new assignedDoctor({
    doctorId: req.body.doctorId,
    userId: req.body.userId,
  });

  assign.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Assigned user to doctor" });
  });
};

exports.profileInfo = (req, res) => {
  User.findOne(
    {
      _id: req.params.userId,
    },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Role.findOne(
        {
          _id: user.roles,
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          var profile = {
            name: user.name,
            lname: user.lname,
            email: user.email,
            role: role.name,
          };

          if (role.name == "doctor") {
            assignedDoctor
              .find(
                {
                  doctorId: user._id,
                },
                "userId"
              )
              .exec((err, patients) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                profile.patients = patients;

                res.send(profile);
              });
          } else {
            res.send(profile);
          }
        }
      );
    }
  );
};

//Show list of profiles you have access to depending on the role
exports.viewAll = (req, res) => {
  if (req.roleName == "user") {
    res.redirect(`http://localhost:8080/api/view/${req.userId}`);
  } else if (req.roleName == "health_official") {
    Role.findOne(
      {
        name: "user",
      },
      (err, role) => {
        User.find(
          {
            roles: role._id,
            verified: "Active",
            status: "Active",
          },
          "name lname email"
        ).exec((err, cursor) => {
          res.send(cursor);
        });
      }
    );
  } //immigration officer
  else if (req.roleName == "immigration_officer") {
    Role.findOne(
      {
        name: "user",
      },
      (err, role) => {
        User.find(
          {
            roles: role._id,
            verified: "Active",
            status: "Active",
          },
          "name lname email"
        ).exec((err, cursor) => {
          res.send(cursor);
        });
      }
    );
  } else if (req.roleName == "admin") {
    var final = [];
    console.log(
      "------------------------------------------------------------------------"
    );
    User.find({}, "name lname email roles verified").exec(
      async (err, cursor) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        cursor.forEach((doc, index) => {
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
            if (doc.roles !== null && doc.roles.name == "doctor") {
              assignedDoctor
                .count({
                  doctorId: doc._id,
                })
                .exec((err, count) => {
                  var NewArray = {
                    _id: doc._id,
                    name: doc.name,
                    lname: doc.lname,
                    email: doc.email,
                    roles: doc.roles,
                    verified: doc.verified,
                    count: count,
                  };
                  cursor[index] = NewArray;
                });
            }
            setTimeout(() => {
              if (index == cursor.length - 1) {
                res.send(cursor);
              }
            }, 500);
          });
        });
      }
    );
  } else if (req.roleName == "doctor") {
    let listOfPatients = [];
    assignedDoctor
      .find(
        {
          doctorId: req.userId,
        },
        "userId"
      )
      .exec((err, patients) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < patients.length; i++) {
          var obj = patients[i];
          User.findOne(
            {
              _id: obj.userId,
            },
            "name lname email"
          ).exec((err, patient) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            listOfPatients.push(patient);
            if (i == patients.length - 1) {
              res.send(listOfPatients);
            }
          });
        }
      });
  }
};
