const router = require("express").Router()
const gempa = require("../controllers/gempa/gempa.js")

router.get("/", gempa)

module.exports =router