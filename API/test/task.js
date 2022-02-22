const { expect } = require("chai");
const authController = require("../controllers/authControllers");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var assert = require('assert');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Register/Login API', () => {

     describe("POST /api/auth/signin", () =>{
        it("Input \: Existing User - It should return a OK server status", (done) =>{
            chai.request(server)
                .post("/api/auth/signin")
                .send({
                    email:"doctor@doctor.com",
                    password:"doctor"
                })
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                }) 
                
        })

        it("Input \: Non-Existing User - It should return a 404 server status", (done) =>{
            chai.request(server)
                .post("/api/auth/signin")
                .send({
                    email:"DoesnotExists@gmail.com",
                    password:"pass"
                })
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                }) 
                
        })

        it("Input \: Existing User - It should return the right properties of a user in a Json", (done) =>{
            chai.request(server)
                .post("/api/auth/signin")
                .send({
                    email:"doctor@doctor.com",
                    password:"doctor"
                })
                .end((err, response) => {
                    response.body.should.have.property("id");
                    response.body.should.have.property("name");
                    response.body.should.have.property("email").eq("doctor@doctor.com");
                    response.body.should.have.property("roles");
                    response.body.should.have.property("accessToken");
                    response.body.should.have.property("verified");
                done();
                })
        
        })

       
    })

    describe("POST /api/auth/register", () =>{
        it("Input \: Existing User - Cannot register an already existing user ", (done) =>{
            chai.request(server)
                .post("/api/auth/register")
                .send({
                    "name" : "Doccy",
                    "lname": "Badmin",
                    "email":"soen390testing@gmail.com",
                    "password":"pass",
                    "cpassword": "pass",
                    "roles": "immigration_officer"
                })
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                }) 
                
        })

        it("Input \: Missing Form Input - User validation failed: Missing Path is required. ", (done) =>{
            chai.request(server)
                .post("/api/auth/register")
                .send({
                    "name" : "Doccy",
                    "email":"soen390testing@gmail.com",
                    "password":"pass",
                    "cpassword": "pass",
                    "roles": "immigration_officer"
                })
                .end((err, response) => {
                    response.should.have.status(400);
                done();
                })
                
        })
    })
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
    describe("GET /api/auth/confirm/DOC", () =>{
        it("Input \: Verification - User successfully verified without error ", (done) =>{
            chai.request(server)
                .get("/api/auth/confirm/DOC")
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