const {verifyRegister} = require("../middlewares")
const controller = require("../controllers/authControllers")


module.exports = function(app){
    //Access Header Token
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })
    //POST route for registering new user
    app.post(
        "/api/auth/register",
        [
            verifyRegister.checkDuplicateEmail
        ],
        controller.register
    )
    //GET route for confirming new user via confirmation link
    app.get(
        "/api/auth/confirm/:confirmationCode",
        controller.verifyUser
    )
    //PUT route for resetting the new user
    app.put(
        "/api/auth/resetPassword",
        controller.resetPassword
     )
    //POST route for sign-in user
    app.post("/api/auth/signin", controller.signin)

    //Get route for forgot password
    app.get("/api/auth/resetPassword", controller.forgotPasswordCEmail)

    //Get route for forgot password after confirmation through email
    app.get("/api/auth/resetPassword/:email", controller.forgotPassword)
}