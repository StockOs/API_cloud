const db = require("../db.js")

const payment = async (cardNumber, firebaseId) => {
  const res = await db.simpleQuery("UPDATE users SET subscription=1, bankCard=? WHERE firebaseUid=?", [cardNumber, firebaseId])
  return res
}

module.exports = {
  payment,
}
