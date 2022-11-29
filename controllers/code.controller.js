const { JavaScriptRunner } = require('../runners/jsRunner')
const { PythonRunner } = require('../runners/PythonRunner')
const { createFile } = require('../utils/createFile')
const { languages } = require('../utils/languages')

module.exports.PyCodeRunner = async (req, res, next) => {
  const { codeSnippet, language } = req.body
  console.log(req.body)
  const filePath = createFile(codeSnippet, language)
  var result = { logs: '', error: '' }
  if (languages.Python === language) {
    result = await PythonRunner(filePath)
  } else if (languages.JavaScript === language) {
    result = await JavaScriptRunner(filePath)
  }
  console.log(result)
  res.json({
    status: 'Success',
    output: result.logs,
    consoleError: result.error,
  })
}
