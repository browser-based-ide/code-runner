const { PythonRunner } = require('../runners/PythonRunner');


module.exports.PyCodeRunner = async (req, res, next) => {
  const result = await PythonRunner(req.file)
  console.log(result);
  res.json({ status: 'Success', msg: result });
};
