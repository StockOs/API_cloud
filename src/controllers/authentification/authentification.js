const firebase = require("firebase")
const admin = require("firebase-admin")
const validator = require("email-validator")

const firebaseMiddleware = require("../../middleware/firebase/firebaseMiddleware.js")
const UserModel = require("../../models/users/users.model.js")

const { USERNAME_PATTERN } = require("../../helpers/regex/userconst.js")

const { response200WithData, response201WithMessage, response201WithData, response400WithMessage, response401WithMessage, response500WithMessage } = require("../../helpers/expressRes")

const validateUser = async (req, res) => {
  const token = firebaseMiddleware.extractToken(req)

  admin
    .auth()
    .verifyIdToken(token)
    .then(async function (decodedToken) {
      admin
        .auth()
        .getUser(decodedToken.uid)
        .then(async (userRecord) => {
          const userExist = await UserModel.findByUID(userRecord.uid)
          if (userExist) {
            const userStatus = await UserModel.getUserStatusModel(userExist[0]["id"])
            if (userStatus) {
              return response200WithData(res, userStatus)
            }
          } else {
            try {
              const creatUSer = await UserModel.createUserByFirebase(userRecord.displayName, userRecord.email, userRecord.uid, true)

              if (creatUSer) {
                return response201WithData(res, creatUSer)
              }
            } catch (e) {
              return response500WithMessage(res, "Register failed")
            }
          }
        })
        .catch((e) => {
          console.log(e)
          return response500WithMessage(res, "Register failed")
        })
    })
    .catch((e) => {
      console.log(e)
      response401WithMessage(res, "Invalid token")
    })
}

const register = async (req, res) => {
  // verif body is not empty
  if (!req.body) {
    return response400WithMessage(res, "You cannot send an empty request")
  }
  // verif name is not empty
  if (!req.body.name) {
    return response400WithMessage(res, "Your request does not contain any name")
  }
  // verif Pattern name
  if (USERNAME_PATTERN.test(req.body.name)) {
    return response400WithMessage(res, "Incorrect name spelling")
  }
  // verif email is not empty
  if (!req.body.email) {
    return response400WithMessage(res, "Your request does not contain any email")
  }
  // verif Pattern email
  if (!validator.validate(req.body.email)) {
    return response400WithMessage(res, "Incorrect email spelling")
  }

  admin
    .auth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.name,
    })
    .then(() => {
      return response201WithMessage(res, "Successful registration")
    })
    .catch(() => {
      return response500WithMessage(res, "Register failed")
    })
}

// Login User in app (check on Firebase)
const login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async function (result) {
      const idToken = await result.user.getIdToken(false)
      return response201WithData(res, idToken)
    })
    .catch(function (e) {
      console.log(e)
      return response401WithMessage(res, "Login failed")
    })
}

module.exports = {
  validateUser,
  register,
  login,
}
