const { expect } = require("chai");
const authController = require("../controllers/authControllers");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var assert = require('assert');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Change Password API', () => {
    describe("PUT /api/auth/resetPassword", () =>{
        it("Input \: New Password - Password successfully changes without error ", (done) =>{
            chai.request(server)
                .put("/api/auth/resetPassword")
                .send({
                    "email" : "soen390testing@gmail.com",
                    "currentPassword" : "pass",
                    "newPassword":"pass"
                })
                .end((err, response) => {
                    response.should.have.status(200);
                done();
            }) 
        })
    })

    describe('Test random password', function () {
        it('should return a random password', function () {
               assert.equal(authController.getRandomPassword().length, 10);
        })
    })

    describe("PUT /api/auth/passwordrest", () =>{
        it("Input \: Password Reset - User successfully reset his password without error ", (done) =>{
            chai.request(server)
                .put("/api/auth/passwordrest")
                .send({
                    email:"batata@gmail.com"
                })
                .end((err, response) => {
                    response.should.have.status(200);
                done();
            }) 
        })
        it("Input \: Fake Password Reset - User enters a non existing email address", (done) =>{
            chai.request(server)
                .put("/api/auth/passwordrest")
                .send({
                    email:"crazybanana69@gmail.com"
                })
                .end((err, response) => {
                    response.should.have.status(404);
                done();
            }) 
        })
    })
});