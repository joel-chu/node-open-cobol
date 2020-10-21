// running the cobc command
const { spawn } = require('child_process')
const { CMD_NAME } = require('./constants')
const { err } = require('./check')

/**
 * actually running the command
 * @param {string} cmd the command to run
 * @param {array} params argument / parameters to pass to the command
 * @return {promise}
 */
function exec(cmd, params) {

  return new Promise((resolver, rejecter) => {
    const p = spawn(CMD_NAME, ['-x'].concat(params))
    let result, error;
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
 *
 */
function compile(params) {

}

/**
 * After the first one then we take the path and modified it to find the compiled binary
 * 
 */
function run(pathToBin, params) {

}

module.exports = { compile, run }
