const jwt = require("jsonwebtoken");
const { user } = require("../models");
const db = require("../models");
const User = db.user
const Role = db.role
const assignedDoctor = db.assignedDoctor;
const Report = db.report;
//Verifies the x-access jwt header token
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({message: "No token provided"})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({message: "Denied Access"})
        }
        req.userId = decoded.id
        next()
    })
}

//Checks if the user is an admin in the database
isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
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

                /*
                for(let i=0; i<roles.length; i++){
                    if(roles[i].name === "admin"){
                        next()
                        return
                    }
                }
                */
                if(roles.name == "admin"){
                    next()
                    return
                }
                res.status(403).send({message: "Require Admin Role"})
            }
        )

    })
}
//Checks if the user has a special role
isSpecial = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
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

                if(roles.name != "user"){
                    next()
                    return
                }
                res.status(403).send({message: "Require Special Role"})
            }
        )

    })
}

//Checks if the user is Doctor
isDoctor = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
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

                if(roles.name == "doctor"){
                    next()
                    return
                }
                res.status(403).send({message: "Require Doctor Role"})
            }
        )

    })
}

//Checks if the user is a health official
isHealthOfficial = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
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

                if(roles.name == "health_official"){
                    next()
                    return
                }
                res.status(403).send({message: "Require Health Official Role"})
            }
        )

    })
}


canView = (req, res, next) => {
    //console.log(req.params.userId)
    //console.log(req.userId)
    User.findById(req.userId).exec((err, user) => {
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

                if(roles.name == "admin" || roles.name == "health_official" || roles.name == "immigration_officer") {
                    next()
                    return
                }else if (req.userId == req.params.userId){
                    next()
                    return 
                }
                else if(roles.name == "doctor"){
                    assignedDoctor.findOne(
                        {
                            doctorId: req.userId,
                            userId: req.params.userId
                        },
                        (err) => {
                            if(err){
                                res.status(500).send({message: err})
                                return
                            }
                            next()
                            return
                        }    
                    )
                }
                else if(roles.name == "user"){
                    res.status(500).send({message: "Patient cannot access this profile"})
                    return 
                }
                else{
                    res.status(500).send({message: "Something went wrong"})
                    return
                }
                
            }   
        )
    })
}

requestRoleName = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
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

                req.roleName = roles.name
                next()
            }
        )

    })
}

dailyReport = (req, res, next) => {

       Report.findOne({
           userId: req.body.userId,
           date: {$gte: new Date().setHours(0,0,0,0), $lt: new Date().setHours(23,59,59,999)}  
       }).exec((err, report) => {
            if(err){
                res.status(500).send({message: err})
                return
            }

            req.exists = report
            next()
       })
       

}

isMyPatient = (req, res, next) => {
    assignedDoctor.find({doctorId: req.userId}).exec((err, user) => {
        if(err){
            res.status(500).send({message: err})
            return
        }
       req.myPatients = user
    
       var include = false
       user.forEach((value) => {
           if(value.userId == req.body.userId || value.userId == req.params.userId) {
            include = true
           }
       })
       if(!include){
        res.status(500).send("You are not assigned to that patient")
        return
       }
       next()
    })   
}




canFillReport = (req, res, next) =>{

    Report.find(
        {
            userId: req.userId,
        }).sort({date: -1}).exec((err, users) => {
            var user = users[0]
            if(user != null && Object.values(user.questions)[0] == null &&
            Object.values(user.questions)[1] == null && Object.values(user.questions)[2] == null &&
            Object.values(user.questions)[3] == null && Object.values(user.questions)[4] == null){
                req.reportId = user._id
                next()
            }else{
                res.status(500).send("You have no reports to fill")
            }

    })


}

uniqueUser = (req, res, next) =>{
    assignedDoctor.findOne({userId: req.body.userId}).exec((err, value) =>{
        if(err){
            res.status(500).send({message: err})
            return
        }
        if(value != null){
            req.Assignation = value._id;
        }
        next()

    })
}


const authJwt = {
    verifyToken,
    isAdmin,
    isSpecial,
    canView,
    requestRoleName,
    isDoctor,
    isHealthOfficial,
    dailyReport,
    canFillReport,
    isMyPatient,
    uniqueUser
}
module.exports = authJwt