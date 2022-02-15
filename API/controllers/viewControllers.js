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

exports.viewAll = (req, res) => {
    
}

//return role Name
getRoleName = (id) => {
    User.findById(id).exec((err, user) => {
        if(err){
            res.status(500).send({message: err})
            return
        }
        Role.findOne(
            {
                _id: user.roles
            },
            (err, roles) => {
                if(err){
                    res.status(500).send({message: err})
                    return
                }

                return roles.name
            }
        )

    })
}


checkUserId = async (id) => {
    await User.findById(id).exec((err, user) => {
        if(err){
            res.status(500).send({message: err})
            return
        }
        return id;

    })
}