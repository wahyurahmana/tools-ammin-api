const router = require('express').Router()
const cuaca = require("./cuaca.js")
const emas = require("./emasLogamMulia.js")
const gempa = require("./gempa.js")

router.get('/', (req, res) => {
  res.status(200).json({status : true, message : 'CREATED BY YURA'})
})

router.use("/cuaca", cuaca)
router.use("/emas", emas)
router.use("/gempa", gempa)

module.exports = router