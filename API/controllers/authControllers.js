const db = require("../models");
const nodemailer = require("./mailController");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Method used to take in the form information to add a user to a  database
exports.register = async (req, res) => {
  try {
    if (req.body.password != req.body.cpassword) {
      console.log("Passwords do not match");
    } else {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.EMAIL_TOKEN_SECRET
      );
        //Hashes the password for safety
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const signedUpUser = new User({
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        confirmationCode: token,
      });
      //Adds the user if there is no error
      signedUpUser.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (req.body.roles && req.body.roles.length > 0) {
          Role.findOne(
            {
              name: req.body.roles,
            },
            (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              //check if user or special role
              var verified = "Pending";
              console.log("role is : " + role);
              console.log("request role is : " + req.body.roles);
              if (role.name == "user") {
                verified = "Active";
              }

              user.roles = role._id;
              user.verified = verified;
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({
                  message:
                    "User registered successfully, Please check your email for account confirmation. ",
                });

                nodemailer.sendConfirmationEmail(
                  user.name,
                  user.email,
                  user.confirmationCode
                );
              });
            }
          );
        } else {//If the user did not enter a role, they/them will automatically be assigned to user
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = role._id;
            user.verified = "Active";
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({
                message:
                  "User registered successfully, Please check your email for account confirmation.",
              });

              nodemailer.sendConfirmationEmail(
                user.username,
                user.email,
                user.confirmationCode
              );
            });
          });
        }
      });
    }
  } catch (e) {
    res.send({ message: e });
  }
};
//Method that takes care of checking if the user can sign in
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not Found" });
      }
      //Compares the encrypted password with the entered one
      var validPass = bcrypt.compareSync(req.body.password, user.password);

      if (!validPass) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }
      //Checks if the user activated their account through their email
      if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }
      //Stores user id in the header token
      var token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400,
      });

      var authorities = "ROLE_" + user.roles.name.toUpperCase();

      // for (let i = 0; i < user.roles.length; i++) {
      //  authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      //}
      //Adds user
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        roles: authorities,
        accessToken: token,
        verified: user.verified,
      });
    });
};
//Verifies if the user is activated
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
//Method for resetting the password
exports.resetPassword = async (req, res) => {
  try {
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      //Compares the current password to the one in the database
      var validPass = bcrypt.compareSync(
        req.body.currentPassword,
        user.password
      );
      if (!validPass) {
        return res.status(401).send({
          message: "Invalid Password Entered.",
        });
      }
      //Updates the password
      user.password = hashedNewPassword;

      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
      //Doubles checks if the password is up to date
      var validPass = bcrypt.compareSync(req.body.newPassword, user.password);
      if (validPass) {
        res.status(200).send({ message: "Password Successfully Updated." });
      }
    });
  } catch (e) {
    res.send({ message: e.message });
  }
};

//Method for forgot password to confirm email
exports.forgotPasswordCEmail = async (req, res) => {
  try {
    User.findOne({email:req.body.email}).then((user)=>{
      if (!user) {
        return res.status(404).send({ message: "User Not found." });//Email provided not available
      }
      res.send({
        message: "Please confirm your email."
      });

      nodemailer.confirmEmailForgotPassword(
        user.name,
        user.email
      );

    });
  }
  catch (e) {
    res.send({message: e.message});
  }
}

//Method for forgot password to change password
exports.forgotPassword = async (req, res) => {
  try {

    User.findOne({email: req.body.email}).then((user)=>{
    
    if (req.body.password != req.body.cpassword) {
      console.log("Passwords do not match");
    } else {

    user.password = bcrypt.hashSync(req.body.newPassword, 10);
    
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
    }

    //Doubles checks if the password is up to date
    var validPass = bcrypt.compareSync(req.body.newPassword, user.password);
    if (validPass) {
      res.status(200).send({ message: "Password Successfully Updated." });
    }

  });
  }
  catch (e) {
    res.send({message: e.message});
  }
}