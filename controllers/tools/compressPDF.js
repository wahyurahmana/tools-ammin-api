const {nanoid} = require("nanoid")
const fs = require('fs')
const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');
const ILovePDFFile = require('@ilovepdf/ilovepdf-nodejs/ILovePDFFile');

module.exports = async (req, res, next) => {
  try {
    const dir = nanoid(9)
    const tempLocation = `temp/${dir}.pdf`
    await req.files.file.mv(tempLocation)
    fs.mkdirSync(`result/${dir}`)
  
    const instance = new ILovePDFApi(`${process.env.PUBLIC_KEY_ILOVEPDF}`, `${process.env.SECRET_KEY_ILOVEPDF}`);
    
    const task = instance.newTask('compress');
    await task.start()
    const file = new ILovePDFFile(tempLocation);
    await task.addFile(file);
    await task.process({ compression_level: 'recommended' });
    const data = await task.download();
    fs.writeFileSync(`result/${dir}/${dir}.pdf`, data)
    res.status(201).json({path : `result/${dir}/${dir}.pdf`})
  } catch (error) {
    next(error)
  }
}