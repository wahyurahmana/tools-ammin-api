require('dotenv').config()
const express = require('express')
const allRoutes = require('./routes/index.js')
const app = express()
const port = 5000
const task = require("./helpers/cronjob.js") 
const errHandler = require("./helpers/errHandler.js")

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(allRoutes)
app.use(errHandler)

task.start()

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})