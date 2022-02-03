let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Register/Login API', () => {

     describe("POST /api/auth/signin", () =>{
        it("Input \: Existing User - It should return a OK server status", (done) =>{
            chai.request(server)
                .post("/api/auth/signin")
                .send({
                    email:"soen390testing@gmail.com",
                    password:"pass"
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
                    email:"soen390testing@gmail.com",
                    password:"pass"
                })
                .end((err, response) => {
                    response.body.should.have.property("id");
                    response.body.should.have.property("name");
                    response.body.should.have.property("email").eq("soen390testing@gmail.com");
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
        it("Input \: New Password - Password successuflly changes without error ", (done) =>{
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
});