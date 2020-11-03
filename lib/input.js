// the input when it's code or file path both are string
// we need to make sure we know what is coming in
const { basename, extname, join, sep } = require('path')
const fs = require('fs')
const tmp = require('tmp')

const { err } = require('./check')
const { ast } = require('./ast')

const {
  COMPILE_FLAG,
  FREE_FLAG,
  EXT,
  NOT_STR_ERR,
  FILE_NOT_FOUND_ERR,
  NOT_EXPECTED_FILE_ERR,
  APP_PATH
} = require('./constants')

/**
 * simple check if this is a path string then read the file out
 * The actual argument pass to open-cobol `cobc -x --free "/tmp/tmp-1328321Eo4uArI3h0N8.tmp"`
 * not sure about what is that --free flag is, but the above code never works correctly
 * @param {string} strInput expect to be string but check it anyway
 * @return {promise} resolve an array with two values
 */
const prepareInput = strInput => {
  let baseFlags = [COMPILE_FLAG]
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
      baseFlags.push(FREE_FLAG)
      // just resolve the file path and that's it
      return resolver([strInput, baseFlags])
    }
    // if this is a string input
    const result = ast(strInput)
    
    tmp.file({ postfix: EXT }, function _tempFileCreated(e, fp, fd, cleanupCallback) {
      if (e) {
        return rejecter(err(e))
      }
      fs.writeFile(fp, result, e => {
        if (e) {
          return rejecter(err(e))
        }
        resolver([fp, baseFlags])
      })
    })
  })
}

/**
 * get the compiled path
 * @param {string} cblFile
 * @return {string} the path to the compiled binary file
 */
function getBinPath(cblFile) {
  // take the file name
  const binFile = basename(cblFile, EXT)
  // should have generate within where it was execuetd
  return join(process.cwd(), binFile)
}

/**
 * When we run inside the docker and found the APP_PATH
 * then we move the compiled binary over before cleanup 
 * @param {string} pathToBin the path to the compiled binary
 * @return {string} return back the pathToBin for other to continue
 */ 
function moveBin(pathToBin) {
  try {
    if (fs.existsSync(APP_PATH)) {
      const binName = fs.basename(pathToBin)
      const dest = fs.join(APP_PATH, binName)
      // by default it will overwrite the existing dest file
      fs.copyFileSync(pathToBin, dest)
    }
  } catch(e) {
   console.error(`[lib/input.js] -> Function.moveBin Error:`, e) 
  }
  return pathToBin
}

/**
 * Remove the compiled file afterward
 * @param {string} pathToBin the path to the bin file
 * @return {string} pathToBin same as above function 
 */
function cleanUp(pathToBin) {
  try {
    fs.unlinkSync(pathToBin)
  } catch(e) {
    // we don't throw anything to affect the outter process
    console.error('[lib/input.js] -> Function.cleanUp Error:', e)
  }
}

/**
 * Check if a path exist 
 * @param {string} p the path to check 
 * @return {boolean} 
 */ 
function checkExist(p) {
  return fs.existsSync(fs.resolve(p))
}

/**
 * Just a promise version of read file 
 * @param {string} p path to the file
 * @return {promise} resolve the content of the file 
 */ 
function readCblFile(p) {
  return new Promise((resolver, rejecter) => {
    if (!checkExist(p)) {
      return rejecter(err( `${p} ${FILE_NOT_FOUND_ERR}`))
    }
    fs.readFile(p, 'utf8', (e, data) => {
      if (err) {
        return rejecter(e)
      }
      return resolver(data)
    })
  })
}

// export
module.exports = {
  prepareInput,
  getBinPath,
  moveBin,
  cleanUp,
  checkExist,
  readCblFile
}
