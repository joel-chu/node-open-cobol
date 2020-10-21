// running the cobc command
const { spawn } = require('child_process')
const { CMD_NAME } = require('./constants')
const { err } = require('./check')

const { getBinPath, cleanUp } = require('./input')

/**
 * actually running the command
 * @param {string} cmd the command to run
 * @param {array} params argument / parameters to pass to the command
 * @return {promise}
 */
function exec(cmd, params) {

  return new Promise((resolver, rejecter) => {
    const p = spawn(cmd, params)
    let result = '', error = ''

    p.stdout.on('data', (data) => {
      result += data.toString()
    })

    p.stderr.on('data', (data) => {
      error += data.toString()
    })

    p.on('close', (code) => {
      if (error) {
          return rejecter(err(error))
      }
      return resolver(result)
    })
  })
}

/**
 * tell cobc to compile the source code file to binary
 * @param {string} pathToFile
 * @param {array} params
 * @return {string} the path to the compile binary file
 */
function compile(pathToFile, params) {
  const args = [pathToFile].concat(params)
  return exec(CMD_NAME, args)
    // prepare the next input
    .then(() => getBinPath(pathToFile))
}

/**
 * After the first one then we take the path and modified it to find the compiled binary
 * @param {string} pathToFile from prepareInput
 * @param {array} params from prepareInput the flags pass to cobc
 * @param {object} options the extract options for other parts
 * @return {*} the final excuted result
 */
function run(pathToFile, params, options) {
  // need some work here to make it less confusing
  const args = options.args ? [options.args] : []

  return compile(pathToFile, params)
    .then(pathToBin => exec(pathToBin, args)
        .then(result => {
          cleanUp(pathToBin)
          return result
        })
        .catch(e => {
          cleanUp(pathToBin)
          throw err(e)
        })
    )
}

module.exports = { compile, run }
