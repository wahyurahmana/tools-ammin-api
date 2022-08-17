const router = require("express").Router()
const Controller = require("../controllers/emas_LogamMulia/emas.js")

router.get("/", Controller.emas)


module.exports =router