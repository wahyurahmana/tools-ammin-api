const fs = require('fs')
const {fromPath} = require("pdf2pic")
const {nanoid} = require("nanoid")

module.exports = async (req, res, next) => {
  try {
    const dir = nanoid(9)
    const tempLocation = `temp/${dir}.pdf`
    await req.files.file.mv(tempLocation)
    fs.mkdirSync(`result/${dir}`)
    const options = {
      density: 100,
      saveFilename: dir,
      savePath: `result/${dir}`,
      format: "jpg",
      width: 1240,
      height: 1754
    };
    const result = await fromPath(tempLocation, options).bulk(-1)
    res.status(201).json({result})
  } catch (error) {
    next(error)
  }
}