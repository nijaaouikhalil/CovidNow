const { authJwt } = require("../middlewares");
const controller = require("../controllers/appointmentChatContoller");



module.exports = function (app) {

  //Added here because not sure where correct place
  // Post route to book appointment
  app.post("/api/appointmentBooking",
  [authJwt.verifyToken],
   controller.makeAppointment);
};