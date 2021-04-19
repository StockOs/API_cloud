const UserModel = require("../../models/users/users.model.js")

const { response200WithData, response200WithMessage, response201WithMessage, response400WithMessage, response500WithMessage } = require("../../helpers/expressRes.js")

const register = async (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  try {
    const data = await UserModel.addUser(name, email, password)
    return response200WithMessage(res, "you are registered")
  } catch (e) {
    return response500WithMessage(res, e)
  }
}

const signIn = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  try {
    const data = await UserModel.verifyIduser(email, password)
    if (!data) {
      return response400WithMessage(res, "This user is not defined")
    }
  } catch (e) {
    return response500WithMessage(res, "oups ! error T_T")
  }

  try {
    const data = await UserModel.signIn(email, password)
    return response200WithMessage(res, "you are connected")
  } catch (e) {
    return response500WithMessage(res, e)
  }
}

const getInfo = async (req, res) => {
  const id = req.user[1]

  try {
    const data = await UserModel.getInfo(id)
    return response200WithData(res, data)
  } catch (e) {
    return response500WithMessage(res, e)
  }
}

const updateUser = async (req, res) => {
  let objectUpdate = new Object()
  let id = req.user[1]

  if (req.body.name) {
    objectUpdate["name"] = req.body.name
  }

  if (req.body.email) {
    objectUpdate["email"] = req.body.email
  }

  if (req.body.password) {
    objectUpdate["password"] = req.body.password
  }
  if (req.body.bankCard) {
    objectUpdate["bankCard"] = req.body.bankCard
  }

  try {
    const data = UserModel.updateUser(id, objectUpdate)
    if (!data) {
      return response400WithMessage(res, "Oups ! error T_T")
    }
    return response201WithMessage(res, "Updated successfuly")
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

const deleteUser = async (req, res) => {
  const id = req.user[1]

  try {
    const data = UserModel.deleteUser(id)
    if (!data) {
      return response400WithMessage(res, "Oups ! error T_T")
    }
    return response201WithMessage(res, "deleted successfuly")
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

module.exports = {
  register,
  signIn,
  getInfo,
  updateUser,
  deleteUser,
}
