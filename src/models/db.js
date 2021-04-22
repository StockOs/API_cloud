const mysql = require("mysql2")
const dbConfig = require("../config/db.config.js")

const pool = mysql.createPool({
  port: dbConfig.PORT,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  waitForConnections: true,
  connectionLimit: 250,
  queueLimit: 100,
})

pool.simpleQuery = async (query, arrayValue) => {
  const [rows, fields] = await pool.promise().query(query, arrayValue)
  if (rows && fields) {
    return rows
  } else {
    return rows
  }
}

module.exports = pool
