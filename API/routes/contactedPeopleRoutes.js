const { authJwt } = require("../middlewares");
const controller = require("../controllers/contactedPeopleController");



module.exports = function (app) {

  //Added here because not sure where correct place
  // Post route to add contacted people
  app.post("/api/contactedPeople",
  [authJwt.verifyToken],
   controller.contactedPerson);
};