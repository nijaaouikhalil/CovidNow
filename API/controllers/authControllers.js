const db = require("../models");
const nodemailer = require("./mailController");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    if (req.body.password != req.body.cpassword) {
      console.log("Passwords do not match");
    } else {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.EMAIL_TOKEN_SECRET
      );

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const signedUpUser = new User({
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        confirmationCode: token,
      });

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
        } else {
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

      var validPass = bcrypt.compareSync(req.body.password, user.password);

      if (!validPass) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }

      if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400,
      });

      var authorities = "ROLE_" + user.roles.name.toUpperCase();

      // for (let i = 0; i < user.roles.length; i++) {
      //  authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      //}
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

exports.resetPassword = async (req, res) => {
  try {
    //console.log("Current password : " + req.body.currentPassword)
    //console.log("New Password : " + req.body.newPassword)
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    //console.log("Hashed New Password :" + hashedNewPassword)
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      //console.log("Comparing the hashed password on the database with the current entered password's hash.")
      var validPass = bcrypt.compareSync(
        req.body.currentPassword,
        user.password
      );
      if (!validPass) {
        return res.status(401).send({
          message: "Invalid Password Entered.",
        });
      }
      user.password = hashedNewPassword;
      //console.log("Changed password to " + user.password)
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });

      console.log(
        "Comparing the new password in the database to the new inputted password"
      );
      var validPass = bcrypt.compareSync(req.body.newPassword, user.password);
      if (validPass) {
        res.status(200).send({ message: "Password Successfully Updated." });
      }
    });
  } catch (e) {
    res.send({ message: e.message });
  }
};
