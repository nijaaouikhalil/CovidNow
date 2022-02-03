const { authJwt } = require("../middlewares")
const controller = require("../controllers/verificationController")

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      //GET route to see non-verified users
      app.get(
          "/api/verify/admin",
          [authJwt.verifyToken, authJwt.isAdmin],
          controller.getPendingList
      )
      //PUT route to deny/accept the special users
      app.put(
        "/api/verify/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.verifyRole
      )
      //PUT route where special users input specific specialized contextual information
      app.put(
        "/api/verify/confirmDetails",
        [authJwt.verifyToken, authJwt.isSpecial],
        controller.roleInformation
      )
}