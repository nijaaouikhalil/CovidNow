const { expect } = require("chai");
const authController = require("../controllers/authControllers");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var assert = require('assert');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Verify User API', () => {
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
});