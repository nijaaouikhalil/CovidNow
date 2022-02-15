const { authJwt } = require("../middlewares")
const controller = require("../controllers/viewControllers")

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      
      app.post(
          "/api/view/assign",
          [authJwt.verifyToken, authJwt.isAdmin],
          controller.assignDoctor
      )

      app.get(
        "/api/view/:userId",
        [authJwt.verifyToken, authJwt.canView],
        controller.profileInfo
    )

    app.get(
      "/api/view/",
      [authJwt.verifyToken, requestRoleName],
      controller.viewAll
  )
      
}