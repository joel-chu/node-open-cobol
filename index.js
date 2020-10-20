// The main file
const { checkCobc } = require('./lib/check')

/**
 * The main API
 * @public
 * @param {string} strInput file path to the .cbl file or the actual COBOL code
 * @param {object} args extra argument to pass to the cboc
 * @return {promise}
 */
function openCobol(strInput, args = {}) {
  return checkCobc()
    .then(() => {
      
    })
}
