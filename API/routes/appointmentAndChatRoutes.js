const { authJwt } = require("../middlewares");
const controller = require("../controllers/appointmentChatContoller");



module.exports = function (app) {

  // Post route to book appointment
  app.post("/api/appointmentBooking",
  [authJwt.verifyToken, authJwt.isMyPatient, authJwt.isDoctor],
   controller.makeAppointment);

  app.get("/api/appointmentsWithPatients",
   [authJwt.verifyToken, authJwt.isDoctor],
   controller.appointmentsWithPatients);
}
