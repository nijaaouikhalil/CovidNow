const jwt = require("jsonwebtoken");
const db = require("../models")
const User = db.user
const Role = db.role

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

const authJwt = {
    verifyToken,
    isAdmin,
    isSpecial
}
module.exports = authJwt