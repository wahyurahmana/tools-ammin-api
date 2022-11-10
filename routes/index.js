const router = require('express').Router()
const cuaca = require("./cuaca.js")
const emas = require("./emasLogamMulia.js")
const gempa = require("./gempa.js")
const tools = require("./tools.js")

router.get('/', (req, res) => {
  res.status(200).json({status : true, message : 'CREATED BY YURA'})
})

router.use("/cuaca", cuaca)
router.use("/emas", emas)
router.use("/gempa", gempa)
router.use("/tools", tools)

router.get('*', (req, res, next) => res.status(404).json({message : 'Route Not Found'}))

module.exports = router