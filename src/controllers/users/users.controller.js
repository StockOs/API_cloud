const UserModel = require("../../models/users/users.model.js");

const {
  response200WithData,
  response500WithMessage,
} = require("../../helpers/expressRes.js");

const getUser = async (req, res) => {
  try {
    const data = await UserModel.getUser();
    return response200WithData(res, data);
  } catch (e) {
    return response500WithMessage(res, e);
  }
};

module.exports = {
  getUser,
};
