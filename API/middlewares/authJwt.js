const jwt = require("jsonwebtoken");
const db = require("../models")
const User = db.user
const Role = db.role
const assignedDoctor = db.assignedDoctor;
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


const authJwt = {
    verifyToken,
    isAdmin,
    isSpecial,
    canView,
    requestRoleName
}
module.exports = authJwt