const fs = require('fs');
const { spawn } = require('child_process');

module.exports.PythonRunner = async file => {
  const executor = spawn('python', [file.path]);

  process.stdin.pipe(executor.stdin);

  let data = '';
  for await (const chunk of executor.stdout) {
    console.log('stdout chunk: ' + chunk);
    data += chunk;
  }

  let error = '';
  for await (const chunk of executor.stderr) {
    console.error('stderr chunk: ' + chunk);
    error += chunk;
  }

  const exitCode = await new Promise((resolve, reject) => {
    executor.on('close', resolve);
  });

  if (exitCode) {
    console.log(`subprocess error exit ${exitCode}, ${error}`);
    return error;
  }

  fs.unlinkSync(file.path);

  return data;
};
