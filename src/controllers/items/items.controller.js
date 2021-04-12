const ItemsModel = require("../../models/items/items.model.js")

const {
  response200WithData,
  response500WithMessage,
} = require("../../helpers/expressRes.js")

const getItemById = async (req, res) => {
  const id = req.params.id
  try {
    const data = await ItemsModel.getItemById(id)
    return response200WithData(res, data)
  } catch (error) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

const getAllItems = async (req, res) => {
  try {
    const data = await ItemsModel.getAllItems()
    return response200WithData(res, data)
  } catch (error) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

const updateItem = async (req, res) => {
  const itemToUpdate = new Object()
  const id = req.params.id

  if (req.body.name) {
    itemToUpdate["name"] = req.body.name
  }

  if (req.body.price) {
    itemToUpdate["pice"] = req.body.pice
  }

  if (req.body.quantity) {
    itemToUpdate["quantity"] = req.body.quantity
  }

  try {
    const data = ItemModel.updateItem(id, itemToUpdate)
    if (!data) {
      return response400WithMessage(res, "Oups ! error T_T")
    }
    return response201WithMessage(res, "Updated successfuly")
  } catch (error) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

const deleteItem = async (req, res) => {
  const id = req.params.id

  try {
    const data = ItemModel.deleteItem(id)
    if (!data) {
      return response400WithMessage(res, "Oups ! error T_T")
    }
    return response201WithMessage(res, "deleted successfuly")
  } catch (error) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
}

module.exports = { getAllItems, getItemById, updateItem, deleteItem }
