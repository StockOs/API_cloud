const ItemModel = require("../../models/items/items.model.js")

const { response200WithData, response200WithMessage, response201WithMessage, response400WithMessage, response500WithMessage } = require("../../helpers/expressRes.js")

const createItem = async (req, res) => {
  const userId = req.user[1]
  const name = req.body.name
  const quantity = req.body.quantity
  const price = req.body.price

  try {
    const data = await ItemModel.checkItem(userId, name)
    if (data === undefined) {
      ItemModel.createItem(userId, name, quantity, price)
      return response201WithMessage(res, "item enregistred")
    } else {
      ItemModel.addItemAgain(data, userId, quantity)
      return response201WithMessage(res, "Item enregistred")
    }
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

const getAllItems = async (req, res) => {
  const userId = req.user[1]

  try {
    const data = await ItemModel.getAllItems(userId)
    if (!data) {
      return response400WithMessage(res, "You don't have items")
    }
    return response200WithData(res, data)
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

const getItem = async (req, res) => {
  const userId = req.user[1]
  const item = req.params.item

  try {
    const data = await ItemModel.getItem(userId, item)
    if (!data) {
      return response400WithMessage(res, "You don't have items")
    }
    return response200WithData(res, data)
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

module.exports = { createItem, getAllItems, getItem }
