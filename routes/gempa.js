const router = require("express").Router()
const Controller = require("../controllers/gempa/gempa.js")

router.get("/", Controller.gempa)

module.exports =router