const { expect } = require("chai");
const authController = require("../controllers/authControllers");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var assert = require('assert');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Sign In API', () => {
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
});