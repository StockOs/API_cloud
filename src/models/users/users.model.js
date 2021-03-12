const db = require("../db.js");

const verifyIduser = async (email, password) => {
  const res = await db.simpleQuery(
    "SELECT id FROM users WHERE email = ? AND password= ?",
    [email, password]
  );
  return res.length > 0 ? true : false;
};

const addUser = async (name, email, password, business) => {
  const res = await db.simpleQuery(
    "INSERT INTO users (name, email, password, business) VALUE (?,?,?,?)",
    [name, email, password, business]
  );
  return res;
};

const signIn = async (email, password) => {
  const res = await db.simpleQuery(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password]
  );
  return res;
};

const getInfo = async (id) => {
  const res = await db.simpleQuery("SELECT * FROM users WHERE id=?", [id]);
  return res;
};

module.exports = {
  verifyIduser,
  addUser,
  signIn,
  getInfo,
};
