const router = require("express").Router()
const fileUpload = require('express-fileupload');
const compressPDF = require("../controllers/tools/compressPDF.js")
const pdfToImg = require("../controllers/tools/pdfToImg.js")
const resizeImg = require("../controllers/tools/resizeImg.js")

router.use(fileUpload());

router.post('/compress-pdf', compressPDF)
router.post('/pdf-to-img', pdfToImg)
router.post('/resize-img', resizeImg)

module.exports =router