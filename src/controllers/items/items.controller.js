const ItemsModel = require('../../models/items/items.model.js')

const {
  response200WithData,
  response400WithMessage,
  response500WithMessage,
} = require('../../helpers/expressRes.js')

const getItemById = async (req, res) => {
  const id = req.params.id
  try {
    const data = await ItemsModel.getItemById(id)
    if (!data) {
      return response400WithMessage(res, 'id is not defined')
    }
    return response200WithData(res, data)
  } catch (error) {
    return response500WithMessage(res, 'This itemId is not defined')
  }
}

const getAllItems = async (req, res) => {
  const userId= req.data.userId
  try {
    const itemsForUser = await ItemsModel.getAllItems(userId)
    if (itemsForUser.length === 0) {
      return response400WithMessage(res, 'This user don\'t have items')
    }
    return response200WithData(res, itemsForUser)
  } catch (error) {
    return response500WithMessage(res, 'Error')
  }
}

const addItem = async (req, res) => {
  const userId = req.body.userId
  const name = req.body.name
  const price = req.body.price
  const quantity = req.body.quantity

  try {
    const data = await ItemsModel.addItem(userId, name, price, quantity)
    if (!data) {
      return response400WithMessage(res, 'Wrong type or parameter(s) is missing')
    }
    return response200WithMessage(res, "you are registered")
  } catch (error) {
    return response500WithMessage(res, error)
  }
};

const updateItem = async (req, res) => {
  const itemToUpdate = new Object()
  const id = req.params.id

  if (req.body.name) {
    itemToUpdate['name'] = req.body.name
  }

  if (req.body.price) {
    itemToUpdate['pice'] = req.body.pice
  }

  if (req.body.quantity) {
    itemToUpdate['quantity'] = req.body.quantity
  }

  try {
    const data = ItemModel.updateItem(id, itemToUpdate)
    if (!data) {
      return response400WithMessage(res, 'ItemId is not defined')
    }
    return response201WithMessage(res, 'Updated successfuly')
  } catch (error) {
    return response500WithMessage(res, 'Error')
  }
}

const deleteItem = async (req, res) => {
  const id = req.params.id

  try {
    const data = ItemModel.deleteItem(id)
    if (!data) {
      return response400WithMessage(res, 'ItemId is not defined')
    }
    return response201WithMessage(res, 'deleted successfuly')
  } catch (error) {
    return response400WithMessage(res, 'Error')
  }
}

module.exports = { getAllItems, getItemById, addItem, updateItem, deleteItem }
