// running the cobc command
const { spawn } = require('child_process')
const { CMD_NAME } = require('./constants')
const { err } = require('./check')

/**
 * actually running the command
 * @param {string} exec the command to run
 * @param {object} params argument / parameters to pass to the command
 * @return {promise}
 */
function run(params) {

  console.log(params)

  return new Promise((resolver, rejecter) => {
    const p = spawn(CMD_NAME, ['-x', '--free'].concat(params))
    let result, error;
    p.stdout.on('data', (data) => {
      result = data
    })

    p.stderr.on('data', (data) => {
      error = data
    })

    p.on('close', (code) => {
      if (error) {
          return rejecter(err(error))
      }
      return resolver(result)
    })
  })
}

module.exports = { run }
