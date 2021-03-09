const pools = require("../db.js");

// Verify if this comment exists
const verifyConnectivity = async () => {
  const res = await pools.simpleQuery("SELECT * FROM user LIMIT 1", []);
  return res.length <= 0 ? false : true;
};

module.exports = {
  verifyConnectivity,
};
