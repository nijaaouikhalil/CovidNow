const {verifyRegister} = require("../middlewares")
const controller = require("../controllers/authControllers")


module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.post(
        "/api/auth/register",
        [
            verifyRegister.checkDuplicateEmail
        ],
        controller.register
    )

    app.get(
        "/api/auth/confirm/:confirmationCode",
        controller.verifyUser
    )

    app.put(
        "/api/auth/resetPassword",
        controller.resetPassword
     )

    app.post("/api/auth/signin", controller.signin)
}