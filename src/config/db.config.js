const process = require("process");

module.exports = {
  PORT: process.env.SQL_PORT,
  HOST: process.env.SQL_HOST,
  USER: process.env.SQL_USER,
  PASSWORD: process.env.SQL_PASSWORD,
  DB: process.env.SQL_DB,
};
