const UserModel = require("../../models/users/users.model.js");

const {
  response200WithData,
  response200WithMessage,
  response400WithMessage,
  response500WithMessage,
} = require("../../helpers/expressRes.js");

const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const business = req.body.business;

  try {
    const data = await UserModel.addUser(name, email, password, business);
    return response200WithMessage(res, "you are registered");
  } catch (e) {
    console.log(e);
    return response500WithMessage(res, e);
  }
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await UserModel.verifyIduser(email, password);
    if (!data) {
      return response400WithMessage(res, "This user is not defined");
    }
  } catch (e) {
    return response500WithMessage(res, "oups ! error T_T");
  }

  try {
    const data = await UserModel.signIn(email, password);
    return response200WithMessage(res, "you are connected");
  } catch (e) {
    return response500WithMessage(res, e);
  }
};

const getInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await UserModel.getInfo(id);
    return response200WithData(res, data);
  } catch (e) {
    return response500WithMessage(res, e);
  }
};

module.exports = {
  register,
  signIn,
  getInfo,
};
