const router = require("express").Router()
const emas = require("../controllers/emasLogamMulia/emas.js")

router.get("/", emas)


module.exports =router