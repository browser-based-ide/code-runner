const { PythonRunner } = require('../runners/PythonRunner');
const { createFile } = require('../utils/createFile');


module.exports.PyCodeRunner = async (req, res, next) => {
  const {codeSnippet, language} = req.body
  const filePath = await createFile(codeSnippet, language)
  const result = await PythonRunner(filePath)
  res.json({ status: 'Success', output: result.logs, consoleError: result.error })
};
