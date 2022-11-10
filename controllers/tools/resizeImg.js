const fs = require('fs')
const {nanoid} = require("nanoid")
const sharp = require('sharp')

module.exports = async (req, res, next) => {
  try {
    const dir = nanoid(9)
    const tempLocation = `temp/${dir}_${req.files.file.name}`
    await req.files.file.mv(tempLocation)
    fs.mkdirSync(`result/${dir}`)
    const data = await sharp(`temp/${dir}_${req.files.file.name}`)
      .jpeg({ mozjpeg: true })
      .toFile(`result/${dir}/${dir}.jpg`)
    fs.unlinkSync(tempLocation)
    const result = {...data, path : `result/${dir}/${dir}.jpg`}
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}