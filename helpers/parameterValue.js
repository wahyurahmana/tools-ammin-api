const checkArahAngin = require("./checkArahAngin")
const checkCuaca = require("./checkCuaca")

module.exports = (values) => {
  const result = values.map(el => {
    if(el['$'].unit === 'icon'){
      return checkCuaca(el._)
    }else if(el['$'].unit === 'CARD'){
      return checkArahAngin(el._)
    }else{
      return `${el._}${el['$'].unit}`
    }
  })
  return result
}