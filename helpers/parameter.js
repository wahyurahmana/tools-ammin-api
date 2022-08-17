const timeRange = require("./timeRange")

module.exports = (parameter) => {
  const result = parameter.map(el => {
    return {
      name : el['$'].description,
      timeRanges: timeRange(el.timerange)
    }
  })
  return result
}