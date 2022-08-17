const axios = require('axios');
const xml2js = require('xml2js');
const moment = require('moment');
moment.suppressDeprecationWarnings = true

module.exports = class Controller {
  static async gempa(req, res) {
    try {
      const result = await axios({
        url: 'https://bmkg-content-inatews.storage.googleapis.com/live30event.xml',
        method: 'GET'
      })
      const xml = result.data
      const parser = new xml2js.Parser();
      const dataTemp = await parser.parseStringPromise(xml)
      const data = []
      for(let i = 0; i < 50; i++){
        let waktuTemp = moment.utc(dataTemp.Infogempa.gempa[i].waktu[0].replaceAll("/", "-")).format('YYYY-MM-DD HH:mm:ss');
        data.push({
          waktu : moment.utc(waktuTemp).local().format('YYYY-MM-DD HH:mm:ss'),
          lintang : dataTemp.Infogempa.gempa[i].lintang[0],
          bujur : dataTemp.Infogempa.gempa[i].bujur[0],
          dalam : dataTemp.Infogempa.gempa[i].dalam[0],
          mag : dataTemp.Infogempa.gempa[i].mag[0],
          area : dataTemp.Infogempa.gempa[i].area[0]
        })
      }
      res.status(200).json({
        status: true,
        data
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}