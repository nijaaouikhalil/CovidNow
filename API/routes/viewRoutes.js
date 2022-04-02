const { authJwt } = require("../middlewares");
const controller = require("../controllers/viewControllers");
const { canFillReport } = require("../middlewares/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Admin assigns patient to doctor
  app.post(
    "/api/view/assign",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.uniqueUser],
    controller.assignDoctor
  );
  
  //See users information with user id
  app.get(
    "/api/view/:userId",
    [authJwt.verifyToken, authJwt.canView],
    controller.profileInfo
  );
  
  //View all users according to permission
  app.get(
    "/api/view/",
    [authJwt.verifyToken, requestRoleName],
    controller.viewAll
  );
  
  //Doctor calls patient for a report
  app.put(
    "/api/view/requestReport",
    [
      authJwt.verifyToken,
      authJwt.isDoctor,
      authJwt.isMyPatient,
      authJwt.dailyReport,
    ],
    controller.askReport
  );
  
  //Get custom question requested by doctor 
  app.get(
    "/api/view/fillReport/getCustom",
    [authJwt.verifyToken, authJwt.canFillReport],
    controller.getDoctorsCustomRequest
  );

  //Patient fills report with his answers
  app.put(
    "/api/view/fillReport",
    [authJwt.verifyToken, authJwt.canFillReport],
    controller.fillReport
  );
  
  //view a users reports
  app.get(
    "/api/view/:userId/report",
    [authJwt.verifyToken, authJwt.isDoctor, authJwt.isMyPatient],
    controller.viewReport
  );
  
  //mark a report as viewed
  app.put(
    "/api/view/:userId/report/viewed/:reportId",
    [authJwt.verifyToken, authJwt.isDoctor],
    controller.markAsViewed
  );

  //flag user with covid status
  app.put(
    "/api/view/:userId/flagcovid",
    [authJwt.verifyToken],
    controller.flaguser
  );
  
  //Doctor gets all his patient reports that have not been seen
  app.get(
    "/api/view/report/all/mypatients",
    [authJwt.verifyToken, authJwt.isDoctor],
    controller.getNewPatientReports
  );
  
  //Patient accesses his reports
  app.get(
    "/api/view/user/myreport",
    [authJwt.verifyToken],
    controller.viewMyReport
  );
  
  //patient accesses one report
  app.get(
    "/api/view/user/myreport/:reportId",
    [authJwt.verifyToken],
    controller.viewMyReportDetails
  );
  
  //Patient can edit reports answers
  app.put(
    "/api/view/user/myreport/:reportId",
    [authJwt.verifyToken],
    controller.editMyReportDetails
  );

};
