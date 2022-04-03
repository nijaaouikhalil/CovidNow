const { expect } = require("chai");
const authController = require("../controllers/authControllers");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var assert = require('assert');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Register API', () => {
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
});