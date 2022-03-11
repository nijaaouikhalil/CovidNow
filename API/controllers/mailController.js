const nodemailer = require("nodemailer");
//Nodemailer stuff
const user = process.env.EMAIL_VERIFICATION;
const pass = process.env.VERIFICATION_PASSWORD;
var bcrypt = require("bcryptjs");

//Creates transport route to send the user the registration mail
const transport = nodemailer.createTransport({
  service: "gmail",
  secure: false, // use SSL
  port: 25, // port for secure SMTP
  auth: {
    user: user,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8080/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

//Forgot password email
module.exports.confirmEmailForgotPassword = (name, email, newPassword) => {
  console.log(email);

  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Change Password",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>You have requested to reset your password for CovidTracker. 
          Please find attached a new temporary password. 
          Your new password : ${newPassword}</p>
          <p> This is system-generated password, make sure to change the password.</p>
          
          </div>`,
    })
    .catch((err) => console.log(err));
  // var el= document.getElementById('confirmChange');
  // el.onclick= showPassword;// if the click <a> tag in the email was pressed trigger showPassword
  // let showPassword = () =>
  // {
  //   user.password = hashedNewPassword; // save the new password
  //   Window.prompt(newPassword); // Prompt the result to the user
  // }
};

module.exports.contactedPeopleEmailToSignUp = (name, email) => {//Email to people that are contacted by patients
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Contacted Covid Patient",
      html: `<h1>Contacted Covid Patient</h1>
          <h2>Hello ${name}</h2>
          <p>We recently knew that you contacted someone that is positive with covid. We would like to ask you to sign up to CovidNow please
              so we can help you out in case of anything.</p>
          <a href=http://localhost:8080/api/auth/register>Sign Up</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};


module.exports.makeAppointment = (name, email) => {//Email to people that are contacted by patients
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Appointment Booking",
      html: `<h1>Your Doctor is asking to book an appointment.</h1>
          <h2>Hello ${name}</h2>
          <p>Your doctor is asking for an appointment with you. Please check your dashboard for the timing and reason of appointment.</p>
          <a href=http://localhost:8080/api/auth/signin>Sign In</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};