// check if open-cobol `cboc` is on it's path
const which = require('which')
const os = require('os')

var _cobcChecked = null

const {
  CMD_NAME,
  NOT_FOUND,
  NOT_SUPPORTED
} = require('./constants')

/**
 * quick wrapper method to save typing
 * @param {*} txt
 * @return {object} Error
 */
const err = (txt = NOT_FOUND) => new Error(txt)

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
      return rejecter(err(NOT_SUPPORTED))
    }

    switch (true) {
      case _cobcChecked === false:
        return rejecter(err())
      case _cobcChecked === true:
        return resolver(true)
      default:
        which(CMD_NAME, err => {
          if (err) {
            _cobcChecked = false
            return rejecter(err())
          }
          _cobcChecked = true
          resolver(true)
        })
    }
  })
}

module.exports = {
  err,
  isWind,
  checkCobc
}
