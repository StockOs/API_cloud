const db = require("../db.js");

const findByUID = async (uid) => {
  const res = await db.simpleQuery(
    "SELECT id FROM users WHERE firebaseUid = ?",
    [uid]
  );
  return res.length > 0 ? res : false;
};

const createUserByFirebase = async (name, email, uid, business) => {
  const res = await db.simpleQuery(
    "INSERT INTO users SET name=?, firebaseUid=?, email=?, business=?",
    [name, uid, email, business]
  );
  return res;
};

const verifyIduser = async (email, password) => {
  const res = await db.simpleQuery(
    "SELECT id FROM users WHERE email = ? AND password= ?",
    [email, password]
  );
  return res.length > 0 ? true : false;
};

const getInfo = async (id) => {
  const res = await db.simpleQuery(
    "SELECT id, name, email, business  FROM users WHERE id=?",
    [id]
  );
  return res;
};

const getUserStatusModel = async (id) => {
  const res = await db.simpleQuery(
    "SELECT id, name, email, business FROM users WHERE id = ?",
    [id]
  );
  return res;
};

/* ******* */

const addUser = async (name, email, password, business) => {
  const res = await db.simpleQuery(
    "INSERT INTO users (name, email, password, business) VALUE (?,?,?,?)",
    [name, email, password, business]
  );
  return res;
};

const updateUser = async (id, objectUpdate) => {
  const res = await db.simpleQuery("UPDATE users SET ? WHERE id = ?", [
    objectUpdate,
    id,
  ]);
  return res;
};

const deleteUser = async (id) => {
  const res = await db.simpleQuery("DELETE FROM users WHERE id=?", [id]);
  return res;
};

module.exports = {
  verifyIduser,
  addUser,
  getInfo,
  updateUser,
  deleteUser,
  findByUID,
  createUserByFirebase,
  getUserStatusModel,
};
