const arrayformat = (array, type) => {
  let arrays = []
  for (const table of array) {
    arrays.push(table[type])
  }
  return arrays
}

module.exports = {arrayformat}