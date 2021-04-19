const db = require("../db.js")

const payment = async (subscription, bankCard) => {
  const res = await db.simpleQuery("INSERT INT0 users (subscription, bankCard) VALUES(?,?)", [subscription, bankCard])
  return res
}

module.exports = {
  payment,
}
