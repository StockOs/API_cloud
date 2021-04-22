const db = require("../db.js")

const getAllCategories = async () => {
  const res = await db.simpleQuery("SELECT id, name FROM categories")
  return res
}

const getCategory = async (id) => {
  const res = await db.simpleQuery(
    "SELECT id, name FROM categories WHERE id=?",
    [id]
  )
  return res
}

module.exports = {
  getAllCategories,
  getCategory,
}
