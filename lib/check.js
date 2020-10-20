// check if open-cobol `cboc` is on it's path
const which = require('which')
const os = require('os')

var _cobcChecked = null
const CMD_NAME = 'cobc'
const NOT_SUPPORTED = 'Unsupported platform, please use the docker version instead'

/**
 * Check if the user is using Linux / Mac or Window (not support)
 * @return {promise}
 */
const isWind = () => {
  return os.platform().toLowerCase().indexOf('wind') > -1
}

/**
 * Run check to see if there is `cobc` in its path
 * @return {promise}
 */
const checkCobc = () => {
  return new Promise((resolver, rejecter) => {
    if (isWind()) {
      return rejecter(NOT_SUPPORTED)
    }

    switch (true) {
      case _cobcChecked === false:
        return rejecter()
      case _cobcChecked === true:
        return resolver()
      default:
        which(CMD_NAME, err => {
          if (err) {
            _cobcChecked = false
            return rejecter()
          }
          _cobcChecked = true
          resolver()
        })
    }
  })
}

module.exports = {
  isWind,
  checkCobc
}
