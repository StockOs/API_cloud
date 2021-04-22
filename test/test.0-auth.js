const supertest = require("supertest")
const app = require("../index.js")
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);


global.app = app
global.request = supertest(app)

/* Variables for test */

global.token
global.testToken







// describe("Test task API Routes Auth", function () {

//   it("POST /auth/user/signIn : Log user", function (done) {
//     const newLogin = {
//       "email": "lucasfront@gmail.com",
//       "password": "lucasfront"
//     }
//     request
//       .post("/auth/user/login")
//       .send(newLogin)
//       .end(function (err, res) {
//         global.token = res.body.data
//         global.testToken = global.token
//         expect(res.status).to.equal(201)
//         done(err)
//       })
//   })
// })

describe('/POST user', () => {

    it('POST /auth/user/login : Log user', (done) => {
        const newLogin = {
        "email": "salsa@gmail.com",
        "password": "salsa69"
        }
      chai.request(app)

          .post('/auth/user/login')
          .send(newLogin)
          .end((err, res) => {
              console.log(res.should.have)
                res.should.have.status(201);

                // res.body.should.be.a('array');

                // res.body.length.should.be.eql(0);

            done();

          });

    });

});