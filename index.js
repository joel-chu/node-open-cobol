// The main file
const { checkCobc } = require('./lib/check')
// const { findImage } = require('./lib/docker')
const { prepareInput } = require('./lib/input')
const { run } = require('./lib/run')
/*
const { 
  DOCKER_NAME,  
  DEFAULT_DOCKER_IMAGE,
  CN_SUFFIX 
} = require('./lib/constants')
*/
/**
 * The first run to determine if we want to check open-cobol or docker version
 * @param {object} options the options pass to the init method
 * @return {promise} 
 */
function setupCheck(options = null) {

  console.info(`setupCheck options:`, options)

  return checkCobc()

  /*
  return options[DOCKER_NAME]
        ? checkCobc() 
        : options[DOCKER_NAME] === true // or pass the --cn flag  
            ? findImage()
            : findImage([DEFAULT_DOCKER_IMAGE, CN_SUFFIX].join(''))
  */
}


/**
 * The main API
 * @public
 * @param {string} strInput file path to the .cbl file or the actual COBOL code
 * @param {object} options extra argument to pass to the cboc
 * @return {promise}
 */
function main(strInput, options = {}) {

  return setupCheck(options)
    .then(() => prepareInput(strInput))
    // first run is to tell cobc to compile it to a binary
    .then(results => Reflect.apply(run, null, results.concat(options)))
}

module.exports = main
