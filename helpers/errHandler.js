const axios = require('axios')

module.exports = (err, req, res, next) => {
  axios({
    url : `https://api.telegram.org/${process.env.API_TELEGRAM}/sendMessage?text=${err}&chat_id=612179633`,
    method : 'GET'
  })
  res.status(500).json({errorPath : req.originalUrl, message : err.message})
}