const db = require('../db.js')

const getItemById = async (id) => {
  return await db.simpleQuery('SELECT * FROM items WHERE id=?', [id])
}

const getAllItems = async () => {
  return await db.simpleQuery('SELECT * FROM items')
}

const updateItem = async (id, itemToUpdate) => {
  return await db.simpleQuery("UPDATE items SET ? WHERE id = ?", [
    itemToUpdate,
    id,
  ])
}

const deleteItem = async (id) => {
  return await db.simpleQuery("DELETE FROM items WHERE id=?", [id])
}

module.exports = {
  getItemById,
  getAllItems,
  updateItem,
  deleteItem,
}
