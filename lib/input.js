// the input when it's code or file path both are string
// we need to make sure we know what is coming in
const { extname, sep } = require('path')
const fs = require('fs')
const tmp = require('tmp')

const { err } = require('./check')
const { ast } = require('./ast')

const EXT = '.cbl'
const NOT_STR_ERR = `Expect input to be string`
const FILE_NOT_FOUND_ERR = `not found!`
const NOT_EXPECTED_FILE_ERR = `is not a ${EXT} file`
/**
 * simple check if this is a path string then read the file out
 * The actual argument pass to open-cobol `cobc -x --free "/tmp/tmp-1328321Eo4uArI3h0N8.tmp"`
 * not sure about what is that --free flag is, but the above code never works correctly
 * @param {string} strInput expect to be string but check it anyway
 * @return {promise}
 */
const prepareInput = strInput => {
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
      // just resolve the file path and that's it
      return resolver(strInput)
    }
    // if this is a string input
    const result = ast(strInput)
    

    resolver(strInput)

  })
}


module.exports = {
  prepareInput
}
