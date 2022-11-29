const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const path = require('path')


const languageExentions = {
  Python: 'py',
  Java: 'java',
  JavaScript: 'js',
  Cpp: 'cpp',
}

module.exports.createFile = (code, language) => {
  const fileName = `${uuidv4()}.${languageExentions[language]}`
  const filePath = path.join(__dirname, `../uploads/${fileName}`)
  fs.writeFile(filePath, code, function (err) {
    if (err) throw err
    console.log('file Saved!')
  })
  return filePath
}
