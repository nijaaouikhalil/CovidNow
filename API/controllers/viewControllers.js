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
        userId: req.body.userId
    })

    assign.save((err) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({message: "Assigned user to doctor"})

    })

}

exports.profileInfo = (req, res) => {
    User.findOne(
        {
            _id: req.params.userId
        },
        (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            Role.findOne(
                {
                    _id: user.roles
                }
            , 
            (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                var profile = {
                    name: user.name,
                    lname: user.lname,
                    email: user.email,
                    role: role.name
                }

                if(role.name == "doctor"){
                    assignedDoctor.find(
                        {
                            doctorId: user._id,
                        },
                        "userId"
                    ).exec((err, patients) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                          }
                                                
                        profile.patients = patients
                        
                        res.send(profile)
                    })

                }else{
                    res.send(profile)
                }

                

            })

        }
    )
}

//Show list of profiles you have access to depending on the role
exports.viewAll = (req, res) => {
    if(req.roleName == "user"){
        res.redirect(`http://localhost:8080/api/view/${req.userId}`)
    }else if(req.roleName == "health_official"){
       
        Role.findOne(
            {
                name: "user"
            },
            (err, role) => {
                
                User.find(
                    {
                        roles: role._id,
                        verified: "Active",
                        status: "Active"
                    },
                    "name lname email"
                ).exec((err, cursor) =>{
                    res.send(cursor)
                })
            }
        )
    }
    else if(req.roleName == "admin"){
        User.find(
            {
              
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
    }
    else if(req.roleName == "doctor"){

    }
}

