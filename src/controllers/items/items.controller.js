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
      return response201WithMessage(res, "item saved")
    } else {
      ItemModel.addItemAgain(data, userId, quantity)
      return response201WithMessage(res, "Item saved")
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
  const keyItem = req.params.keyItem

  try {
    const data = await ItemModel.getItem(userId, keyItem)
    if (!data) {
      return response400WithMessage(res, "This keyItem is not defined")
    }
    return response200WithData(res, data)
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}
const deleteItem = async (req, res) => {
  const userId = req.user[1]
  const keyItem = req.params.keyItem

  try {
    const data = await ItemModel.deleteItem(userId, keyItem)
    if (!data) {
      return response400WithMessage(res, "This item doesn't exist")
    }
    return response201WithMessage(res, "deleted successfully")
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

const updateItem = async (req, res) => {
  const userId = req.user[1]
  const keyItem = req.params.keyItem

  let objectUpdate = new Object()

  if (req.body.name) {
    objectUpdate["name"] = req.body.name
  }

  if (req.body.price) {
    objectUpdate["price"] = req.body.price
  }

  if (req.body.quantity) {
    const data = await ItemModel.checkQuantity(userId, keyItem)
    if (!data) {
      return response400WithMessage(res, "You don't have this item")
    } else {
      objectUpdate["quantity"] = req.body.quantity
      try {
        const data = await ItemModel.updateQuantity(objectUpdate, userId, keyItem)
        if (data[0].changedRows === 0) {
          return response400WithMessage(res, "This item doesn't exist")
        }
        return response201WithMessage(res, "update quantity successfully")
      } catch (e) {
        return response500WithMessage(res, "Oups ! error T_T")
      }
    }
  } else if (req.body.price) {
    try {
      const data = await ItemModel.updatePrice(objectUpdate, userId, keyItem)
      if (data.changedRows === 0) {
        return response400WithMessage(res, "This item doesn't exist")
      }
      return response201WithMessage(res, "update name/price successfully")
    } catch (e) {
      return response500WithMessage(res, "Oups ! error T_T")
    }
  } else if (req.body.name) {
    try {
      const data = await ItemModel.updateName(objectUpdate, userId, keyItem)
      if (data.changedRows === 0) {
        return response400WithMessage(res, "This item doesn't exist")
      }
      return response201WithMessage(res, "update name/price successfully")
    } catch (e) {
      return response500WithMessage(res, "Oups ! error T_T")
    }
  }
}

module.exports = { createItem, getAllItems, getItem, deleteItem, updateItem }
