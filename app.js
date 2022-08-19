require('dotenv').config()
const express = require('express')
const allRoutes = require('./routes/index.js')
const app = express()
const port = 5000
const task = require("./helpers/cronjob.js") 

app.use(express.json())

app.use(allRoutes)
task.start()

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})