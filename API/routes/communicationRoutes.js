const { authJwt } = require("../middlewares");
const viewController = require("../controllers/viewControllers");
const communicationController = require("../controllers/communicationController");

module.exports = function (app) {
  //Access Header Token
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //get patients doctor(s)
  app.get(
    "/api/message/myDoctor",
    [authJwt.verifyToken],
    viewController.listMyDoctors
  );
  
  //send a message to recipient
  app.post(
    "/api/message/recipient/:recipientId",
    [authJwt.verifyToken, authJwt.requestRoleName],
    communicationController.messageRecipient
  );

  //get history of messages
  app.get(
    "/api/message/recipient/:recipientId",
    [authJwt.verifyToken, authJwt.requestRoleName],
    communicationController.getAllMessages
  );
  

  //get doctors patients
  app.get(
    "/api/message/myPatients",
    [authJwt.verifyToken, authJwt.isDoctor],
    viewController.listMyPatients
  );


};
