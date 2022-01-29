const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = async (req, res) =>{
try{
    if(req.body.password != req.body.cpassword){
            console.log("Passwords do not match")
     }else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const signedUpUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
            
        signedUpUser.save((err, user) => {
            if(err){
                res.status(500).send({message: err})
                return
            }

            if(req.body.roles){
                Role.find(
                    {
                        name: {$in: req.body.roles}
                    },
                    (err, roles)=>{
                        if(err){
                            res.status(500).send({message: err})
                            return
                        }

                        user.roles = roles.map(role => role.id)
                        user.save(err => {
                            if(err){
                                res.status(500).send({message: err})
                                return
                            }
                            res.send({message: "User registered successfully"})
                        })

                    }
                )
            }else{
                Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
            
                    user.roles = [role._id];
                    user.save(err => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }
            
                      res.send({ message: "User registered successfully" });
                    })
                })   
            }
        })
        
    }
}catch(e){
    res.send({ message: "Error" });
}  
}

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    }).populate("roles", "-__v")
      .exec((err, user) =>{
          if(err){
              res.status(500).send({message: err})
              return
          }

          if(!user){
              return res.status(404).send({message: "User Not Found"})
          }

          var validPass = bcrypt.compareSync(req.body.password, user.password)

          if(!validPass){
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password"
                })
          }

          var token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 86400})

          var authorities = []

          for(let i=0; i<user.roles.length; i++){
              authorities.push("ROLE_"+user.roles[i].name.toUpperCase())
          }
          res.status(200).send({
              id: user._id,
              name: user.name,
              email: user.email,
              roles: authorities,
              accessToken: token
          })

      })
}