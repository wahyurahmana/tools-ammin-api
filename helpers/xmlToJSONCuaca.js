const checkCuaca = require('../helpers/checkCuaca');
const checkArahAngin = require('../helpers/checkArahAngin');
const parameter = require('./parameter');
const parseString = require('xml2js').parseString;


const xmlToJSON = (xml) => {
  return new Promise((resolve, reject) => {
    parseString(xml, function (err, result) {
      if (err) {
        reject('ERROR PARSE')
      } else {
        const resultXMLToJSON = []
        result.data.forecast[0].area.forEach(el => {
          if(el.parameter){
            resultXMLToJSON.push({
              name : el['$'].description,
              parameter : parameter(el.parameter)
            })
          }
        })
        resolve(resultXMLToJSON)
      }
    });
  })

}

module.exports = xmlToJSON