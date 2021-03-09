// formatting an array to fetch the value inside
const jsonToString = (json) => {
  let string = JSON.stringify((json))
  return string
}

module.exports = { jsonToString }