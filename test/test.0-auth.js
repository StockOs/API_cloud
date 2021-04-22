const supertest = require("supertest")
const chai = require("chai")
const app = require("../index.js")
const { expect } = require("chai")


global.app = app
global.expect = chai.expect
global.request = supertest(app)

/* Variables for test */

global.token
global.testToken


describe("Test task API Routes Auth", function () {

  it("POST /auth/user/signIn : Log user", function (done) {
    const newLogin = {
      "email": "lucasfront@gmail.com",
      "password": "lucasfront"
    }
    request
      .post("/auth/user/login")
      .send(newLogin)
      .end(function (err, res) {
        global.token = res.body.data
        global.testToken = global.token
        done(err)
      })
  })
})