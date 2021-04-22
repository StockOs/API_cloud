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
  it("POST /auth/user/signUp : Register user", function (done) {
    const newRegister = {
      "name": "mochatest12",
      "email": "mochatest12@gmail.com",
      "password": "mochatest12"
    }
    request
      .post("/auth/user/register")
      .send(newRegister)
      .end(function (err, res) {
        expect(res.status).to.equal(201)
        done(err)
      })
  })


  it("POST /auth/user/signIn : Log user", function (done) {
    const newLogin = {
      "email": "mochatest12@gmail.com",
      "password": "mochatest12"
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
  it("POST /auth/user/validate : test Token", function (done) {
    request
      .post("/auth/user/validate")
      .set({ "Authorization": `Bearer ${global.testToken}` })
      .end(function (err, res) {
        expect(res.status).to.equal(201)
        done(err)
      })
  })
})