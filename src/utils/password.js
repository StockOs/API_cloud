const bcrypt = require('bcrypt')

function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

function comparePassword(password, { user }) {
  return bcrypt.compare(password, user.password)
}

module.exports = { hashPassword, comparePassword }
