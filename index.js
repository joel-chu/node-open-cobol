// The main file
const { checkCobc } = require('./lib/check')
const { prepareInput } = require('./lib/input')
const { run } = require('./lib/run')

/**
 * The main API
 * @public
 * @param {string} strInput file path to the .cbl file or the actual COBOL code
 * @param {object} options extra argument to pass to the cboc
 * @return {promise}
 */
function main(strInput, options = {}) {

  return checkCobc()
    .then(() => prepareInput(strInput))
    // first run is to tell cobc to compile it to a binary
    .then(results => Reflect.apply(run, null, results.concat(options)))
}

module.exports = main
