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

      app.get(
          "/api/verify/admin",
          [authJwt.verifyToken, authJwt.isAdmin],
          controller.getPendingList
      )
      
      app.put(
        "/api/verify/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.verifyRole
      )

      app.put(
        "/api/verify/confirmDetails",
        [authJwt.verifyToken, authJwt.isSpecial],
        controller.roleInformation
      )
}