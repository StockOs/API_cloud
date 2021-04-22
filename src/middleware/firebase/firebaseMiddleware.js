const admin = require("firebase-admin")

const UserModel = require("../../models/users/users.model")

const {
  response400WithMessage,
  response401WithMessage,
  response500WithMessage,
} = require("../../helpers/expressRes")

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

const verifyToken = async (req, res, next) => {
  const token = extractToken(req)
  if (token == null) {
    return response400WithMessage(res, "Forgot to provide a firebase token")
  }
  admin
    .auth()
    .verifyIdToken(token)
    .catch(function (e) {
      console.log(e)
      throw new Error("Invalid token")
    })
    .then(async function (decodedToken) {
      try {
        const data = await UserModel.findByUID(decodedToken.uid)
        if (data) {
          req.user = [[decodedToken], [data[0].id]]
          return next()
        } else {
          let name
          if (!decodedToken.name) {
            name = "Anon"
          } else {
            name = decodedToken.name
          }
          const creatUSer = await UserModel.createUserByFirebase(
            name,
            decodedToken.email,
            decodedToken.uid,
            false
          )
          if (!creatUSer) {
            return response401WithMessage(res, "Problem during user creation")
          }
          const searchUserByUid = await UserModel.findByUID(decodedToken.uid)
          if (searchUserByUid) {
            req.user = [[decodedToken], [searchUserByUid[0].id]]
          }
        }
      } catch (e) {
        return response500WithMessage(res, "User not defined ! T_T")
      }
    })
    .catch(function (e) {
      return response401WithMessage(res, e.message)
    })
}

module.exports = { verifyToken, extractToken }
