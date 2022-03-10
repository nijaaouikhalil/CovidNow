const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;
const assignedDoctor = db.assignedDoctor;
const Report = db.report;

exports.assignDoctor = (req, res) => {
  //verify if doctorId is doctor role
  /*
  if(!ifDoctorById(req.body.doctorId)){
    res.status(403).send({message: "Require Doctor Role"})
  }
  */
 
  //need to verify id's
  if(req.Assignation == null){
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
  }else{
    assignedDoctor.findById(req.Assignation).exec((err, assign) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if(assign.doctorId == req.body.doctorId){
        res.send({ message: "Already assigned to that doctor" });
      }else{
        assign.doctorId = req.body.doctorId
        assign.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
      
          res.send({ message: "Reassigned user to doctor" });
        });
      }
       
    })

  }
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
            role: role ? role.name : "Not selected yet",
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
            assignedDoctor
              .findOne(
                {
                  userId: user._id,
                },
                "doctorId"
              )
              .exec((err, doctor) => {
                if (doctor == null) {
                  profile.doctor = null;
                  res.send(profile);
                } else {
                  User.findOne({ _id: doctor.doctorId }, "name lname").exec(
                    (err, docName) => {
                      profile.doctor = docName;
                      res.send(profile);
                    }
                  );
                }
              });
          }
        }
      );
    }
  );
};


exports.flaguser = (req, res) => {
  User.findOne(
        {
          _id : req.params.userId,
        },
      ).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.covidStatus = req.body.covidStatus;
          user.save((err)=>{
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send('User covid status has been updated.')

          });
      });

}

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
    User.find({}, "name lname email roles verified").exec(
      async (err, cursor) => {
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
            } else {
              assignedDoctor
                .findOne({
                  userId: doc._id,
                })
                .exec((err, assigned) => {
                  if (assigned == null) {
                    your_doctor = null;
                    var NewArray = {
                      _id: doc._id,
                      name: doc.name,
                      lname: doc.lname,
                      email: doc.email,
                      roles: doc.roles,
                      verified: doc.verified,
                      your_doctor: your_doctor,
                    };
                    cursor[index] = NewArray;
                  } else {
                    User.findOne({ _id: assigned.doctorId }, "name lname").exec(
                      (err, your_doctor) => {
                        var NewArray = {
                          _id: doc._id,
                          name: doc.name,
                          lname: doc.lname,
                          email: doc.email,
                          roles: doc.roles,
                          verified: doc.verified,
                          your_doctor: your_doctor,
                        };
                        cursor[index] = NewArray;
                      }
                    );
                  }
                });
            }

            setTimeout(() => {
              if (index == cursor.length - 1) {
                res.send(cursor);
              }
            }, 1000);
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

exports.askReport = (req, res) => {
  var date = req.body.date;
  if (date == null) {
    var date = new Date();
  }

  if (req.exists == null) {
    const newReport = new Report({
      userId: req.body.userId,
      questions: {customQ: req.body.customQ},
      date: date,
    });

    newReport.save((err, report) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message: "User can now fill his report",
      });
    });
  } else {
    Report.findById(req.exists._id).exec((err, report) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      report.questions = null;
      report.date = date;
      report.questions.customQ = req.body.customQ;
      report.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({
          message: "User can now refill his report",
        });
      });
    });
  }
};

exports.fillReport = (req, res) => {
  Report.findById(req.reportId).exec((err, report) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    report.questions.hasCovid = req.body.hasCovid;
    report.questions.hasTravelled = req.body.hasTravelled;
    report.questions.hasAutoImmuneDisease = req.body.hasAutoImmuneDisease;
    report.questions.isPregnant = req.body.isPregnant;
    report.questions.hadAllergicReaction = req.body.hadAllergicReaction;
    
    report.questions.Temperature = req.body.Temperature;
    report.questions.Weight = req.body.Weight;
    report.questions.Height = req.body.Height;

    report.questions.Height = req.body.Height;

    report.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message: "Succesfully submitted your information",
      });
    });
  });
};

exports.viewReport = (req, res) => {
  Report.find({
    userId: req.params.userId,
  }).exec((err, reports) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    User.findById(req.params.userId, "name lname email").exec(
      (err, patient) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        reports.push(patient);
        console.log(patient);
        res.send(reports);
      }
    );
  });
};

exports.viewMyReport = (req, res) => {
  Report.find({
    userId: req.userId,
    
  },"userId date questions"
  ).exec((err, reports) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(reports);
    
  });
};
