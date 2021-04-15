const db = require("../db.js")

const checkItem = async (userId, name) => {
  const res = await db.simpleQuery("SELECT keyItem FROM items_name WHERE userId=? AND name=? ", [userId, name])
  return res[0]
}

const createItem = async (userId, name, quantity, price) => {
  const resItemName = await db.simpleQuery("INSERT INTO items_name (userId, name) VALUE (?,?)", [userId, name])
  const resItem = await db.simpleQuery("SELECT * FROM items_name WHERE userId=? AND name=?", [userId, name])

  let promise = []

  for (const item of resItem) {
    let keyItem = item.keyItem
    let userId = item.userId

    const resItemPrice = db.simpleQuery("INSERT INTO items_price(userId, keyItem, price) VALUE(?,?,?)", [userId, keyItem, price])
    const resOrder = db.simpleQuery("INSERT INTO orders(userId, keyItem, quantity) VALUE(?,?,?)", [userId, keyItem, quantity])
    promise.push(resItemName)
    promise.push(resItemPrice)
    promise.push(resOrder)
  }

  return Promise.all(promise)
    .then((values) => {
      return values
    })
    .catch((e) => {
      return e
    })
}

const addItemAgain = async (data, userId, quantity) => {
  let keyItem = data.keyItem
  const res = await db.simpleQuery("INSERT INTO orders(userId, keyItem, quantity) VALUE(?,?,?)", [userId, keyItem, quantity])
  return res
}

const getAllItems = async (userId) => {
  const res = await db.simpleQuery("SELECT * FROM items_name WHERE userId=?", [userId])
  return res
}

const getItem = async (userId, item) => {
  const res = await db.simpleQuery("SELECT * FROM items_name WHERE userId=? AND name=?", [userId, item])
  return res
}

module.exports = {
  createItem,
  checkItem,
  addItemAgain,
  getAllItems,
  getItem,
}
