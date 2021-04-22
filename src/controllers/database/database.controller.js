const DatabaseModel = require("../../models/database/database.model.js")

const {
  response201WithData,
  response500WithMessage,
} = require("../../helpers/expressRes")

const testDbConnection = async (req, res) => {
  try {
    const data = await DatabaseModel.verifyConnectivity()
    return response201WithData(res, data)
  } catch (e) {
    console.log(e)
    return response500WithMessage(res, e)
  }
}

module.exports = {
  testDbConnection,
}
