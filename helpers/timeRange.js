const parameterValue = require("./parameterValue")

module.exports = (timerange) => {
  const result = timerange.map(el => {
    return {
      dateTime : el['$'].datetime,
      values : parameterValue(el.value)
    }
  })
  return result
}