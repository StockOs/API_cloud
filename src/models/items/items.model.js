const { promise } = require("../db.js")
const db = require("../db.js")

const checkItem = async (userId, name) => {
  const res = await db.simpleQuery("SELECT keyItem FROM items_name WHERE userId=? AND name=? ", [userId, name])
  return res[0]
}

const checkQuantity = async (userId, keyItem) => {
  const res = await db.simpleQuery("SELECT quantity FROM orders WHERE userId=? AND keyItem=? ", [userId, keyItem])
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
  const res = await db.simpleQuery(
    "SELECT orders.userId, orders.keyItem, items_name.name, orders.quantity, items_price.price, sum(quantity) FROM orders INNER JOIN items_price ON items_price.keyItem = orders.keyItem INNER JOIN items_name ON orders.keyItem = items_name.keyItem WHERE items_name.userId=? group by orders.keyItem",
    [userId]
  )
  let promise = []
  for (const table of res) {
    let userId = table.userId
    let keyItem = table.keyItem
    let quantity = table["sum(quantity)"]
    let price = table.price
    let name = table.name

    let object = {
      userId: userId,
      name: name,
      keyItem: keyItem,
      quantity: quantity,
      price: price,
    }
    promise.push(object)
  }

  return promise
}

const getItem = async (userId, keyItem) => {
  const res = await db.simpleQuery(
    "SELECT orders.userId, orders.keyItem, orders.quantity, items_name.name, items_price.price, sum(quantity) FROM orders INNER JOIN items_price ON items_price.keyItem = orders.keyItem INNER JOIN items_name ON orders.keyItem = items_name.keyItem WHERE items_name.userId=? AND orders.keyItem=? group by orders.keyItem",
    [userId, keyItem]
  )
  let promise = []
  for (const table of res) {
    let userId = table.userId
    let keyItem = table.keyItem
    let quantity = table["sum(quantity)"]
    let price = table.price
    let name = table.name

    let object = {
      userId: userId,
      name: name,
      keyItem: keyItem,
      quantity: quantity,
      price: price,
    }
    promise.push(object)
  }
  return promise
}

const deleteItem = async (userId, keyItem) => {
  const deleteFromName = db.simpleQuery("DELETE FROM items_name WHERE userId = ? AND keyItem=?", [userId, keyItem])
  const deleteFromPrice = db.simpleQuery("DELETE FROM items_price WHERE userId = ? AND keyItem=?", [userId, keyItem])
  const deleteFromOrders = db.simpleQuery("DELETE FROM orders WHERE userId = ? AND keyItem=?", [userId, keyItem])

  const deleteItem = await Promise.all([deleteFromName, deleteFromPrice, deleteFromOrders])
  return deleteItem
}
const updateName = async (objectUpdate, userId, keyItem) => {
  const resName = await db.simpleQuery("UPDATE items_name SET name = ? WHERE userId = ? AND keyItem=?", [objectUpdate.name, userId, keyItem])

  return resName
}
const updatePrice = async (objectUpdate, userId, keyItem) => {
  const resPrice = await db.simpleQuery("UPDATE items_price SET price = ? WHERE userId = ? AND keyItem=?", [objectUpdate.price, userId, keyItem])

  return resPrice
}
const updateQuantity = async (objectUpdate, userId, keyItem) => {
  const resDeleteQuantity = db.simpleQuery("DELETE FROM orders WHERE userId=? AND keyItem=?", [userId, keyItem])
  const resUpdateQuantity = db.simpleQuery("INSERT INTO orders (quantity, userId, keyItem) VALUES(?,?,?)", [objectUpdate.quantity, userId, keyItem])

  const update = await Promise.all([resDeleteQuantity, resUpdateQuantity])
  return update
}
const updateAll = async (objectUpdate, userId, keyItem) => {
  const resDeleteQuantity = db.simpleQuery("DELETE FROM orders WHERE userId=? AND keyItem=?", [userId, keyItem])
  const resUpdateQuantity = db.simpleQuery("INSERT INTO orders (quantity, userId, keyItem) VALUES(?,?,?)", [objectUpdate.quantity, userId, keyItem])
  const resName = db.simpleQuery("UPDATE items_name SET name = ? WHERE userId = ? AND keyItem=?", [objectUpdate.name, userId, keyItem])
  const resPrice = db.simpleQuery("UPDATE items_price SET price = ? WHERE userId = ? AND keyItem=?", [objectUpdate.price, userId, keyItem])

  const update = await Promise.all([resDeleteQuantity, resUpdateQuantity, resName, resPrice])
  return update
}

module.exports = {
  createItem,
  checkItem,
  checkQuantity,
  addItemAgain,
  getAllItems,
  getItem,
  deleteItem,
  updatePrice,
  updateName,
  updateQuantity,
  updateAll,
}
