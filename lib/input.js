// the input when it's code or file path both are string
// we need to make sure we know what is coming in
const { extname, sep } = require('path')
const fs = require('fs')

const { err } = require('./check')

const EXT = '.cbl'
const NOT_STR_ERR = `Expect input to be string`
const FILE_NOT_FOUND_ERR = `not found!`
const NOT_EXPECTED_FILE_ERR = `is not a ${EXT} file`
/**
 * simple check if this is a path string then read the file out
 * @param {string} strInput expect to be string but check it anyway
 * @return {promise}
 */
const getInput = strInput => {
  return new Promise((resolver, rejecter) => {

    if (typeof strInput !== 'string') {
      return rejecter(err(NOT_STR_ERR))
    }

    const testInput = strInput.toLowerCase()
    if (testInput.indexOf(sep) > -1) {
      if (extname(testInput) !== EXT) {
        return rejecter(err(`${strInput} ${NOT_EXPECTED_FILE_ERR}`))
      }

      if (!fs.existsSync(strInput)) {
        return rejecter(err(`${strInput} ${FILE_NOT_FOUND_ERR}`))
      }

      fs.readFile(strInput, 'utf8', (e, data) => {
        if (e) {
          return rejecter(err(er))
        }
        resolver(data)
      })
    } else {
      resolver(strInput)
    }
  })
}


module.exports = {
  getInput
}
