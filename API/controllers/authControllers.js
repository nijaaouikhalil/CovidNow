const db = require("../models");
const nodemailer = require('./mailController')
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = async (req, res) =>{
try{
    if(req.body.password != req.body.cpassword){
            console.log("Passwords do not match")
     }else{
         
        const token = jwt.sign({email: req.body.email}, process.env.EMAIL_TOKEN_SECRET)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const signedUpUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            confirmationCode: token
        })
            
        signedUpUser.save((err, user) => {
            if(err){
                res.status(500).send({message: err})
                return
            }

            if(req.body.roles && req.body.roles.length >0){
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
                            res.send({message: "User registered successfully, Please check your email for account confirmation. "})

                            nodemailer.sendConfirmationEmail(
                                user.username,
                                user.email,
                                user.confirmationCode
                         );
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
            
                      res.send({ message: "User registered successfully, Please check your email for account confirmation." });

                      nodemailer.sendConfirmationEmail(
                        user.username,
                        user.email,
                        user.confirmationCode
                     );
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
          
          if (user.status != "Active") {
            return res.status(401).send({
              message: "Pending Account. Please Verify Your Email!",
            });
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

exports.verifyUser = (req, res, next) => {
    User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
        .then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        user.status = "Active";
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            });
        })
        .catch((e) => console.log("error", e));
    };

