const db = require("../db.js");

// Verify if this comment exists
const getUser = async () => {
  const res = await db.simpleQuery("SELECT * FROM users");
  return res;
};

module.exports = {
  getUser,
};
