const kodeArahAngin = require('../kode/kodeArahAngin')

module.exports = (kode) => {
  let arahAngin
  kodeArahAngin.forEach(el => {
    if (el.id === kode){
      arahAngin =  el.value
    }
  })
  return arahAngin
}