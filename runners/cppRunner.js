const fs = require('fs')
const { spawn } = require('child_process')

// unlink .a file and store it in some folder

module.exports.CppRunner = async file => {
  const executor = spawn('g++', [file])

  // process.stdin.pipe(executor.stdin)
  // executor.stdin.write('4 5')
  // executor.stdin.end()

  let logs = ''

  let error = ''
  for await (const chunk of executor.stderr) {
    console.error('stderr chunk: ' + chunk)
    error += chunk
  }

  const exitCode1 = await new Promise((resolve, reject) => {
    executor.on('close', resolve)
  })

  if (exitCode1) {
    console.log(`subprocess error exit ${exitCode1}, ${error}`)
    logs = ''
    fs.unlinkSync(file)
    return { logs, error }
  }

  fs.unlinkSync(file)

  const child = spawn('./a')
  for await (const chunk of child.stdout) {
    console.log('stdout chunk: ' + chunk)
    logs += chunk
  }

  for await (const chunk of child.stderr) {
    console.error('stderr chunk: ' + chunk)
    error += chunk
  }

  const exitCode2 = await new Promise((resolve, reject) => {
    child.on('close', resolve)
  })

  if (exitCode2) {
    console.log(`subprocess error exit ${exitCode2}, ${error}`)
    logs = ''
    return { logs, error }
  }

  return { logs, error }
}
