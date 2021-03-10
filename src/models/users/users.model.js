const db = require("../db.js");

const getUser = async () => {
  const res = await db.simpleQuery("SELECT * FROM users");
  return res;
};

module.exports = {
  getUser,
};
