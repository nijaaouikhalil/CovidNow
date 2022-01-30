const nodemailer = require("nodemailer")
//Nodemailer stuff
const user = process.env.EMAIL_VERIFICATION
const pass = process.env.VERIFICATION_PASSWORD

const transport = nodemailer.createTransport({
    service: "Gmail",
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
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };