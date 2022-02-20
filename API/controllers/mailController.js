const nodemailer = require("nodemailer")
//Nodemailer stuff
const user = process.env.EMAIL_VERIFICATION
const pass = process.env.VERIFICATION_PASSWORD

//Creates transport route to send the user the registration mail
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass
    },
  });

  module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8080/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };

  module.exports.confirmEmailForgotPassword = (name, email) => {
    console.log("Check");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Change Password",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Someone is trying to change your password. Please confirm if it was you who is changing the password.</p>
          <a href=http://localhost:8080/api/auth/resetPassword/${email}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  }