const kodeCuaca = require('../kode/kodeCuaca')

module.exports = (kode) => {
  let cuaca
  kodeCuaca.forEach(el => {
    if (el.value === +kode){
      cuaca =  el.cuaca
    }
  })
  return cuaca
}