// check if open-cobol `cboc` is on it's path
const which = require('which')
const os = require('os')

var _cobcChecked = null
var _dockerChecked = null

const {
  CMD_NAME,
  DOCKER_NAME,
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
        return rejecter(err(NOT_FOUND))
      case _cobcChecked === true:
        return resolver(true)
      default:
        which(CMD_NAME, e => {
          if (e) {
            _cobcChecked = false
            return rejecter(err(e))
          }
          _cobcChecked = true
          resolver(true)
        })
    }
  })
}

/**
 * check if docker install or not
 * @return {promise}
 */
const checkDocker = () => {
  return new Promise((resolver, rejecter) => {
    switch (true) {
      case _dockerChecked === false:
        return rejecter(err(NOT_FOUND))
      case _dockerChecked === true:
        return resolver(true)
      default:
        which(DOCKER_NAME, e => {
          if (e) {
            _dockerChecked = false
            return rejecter(err(e))
          }
          _dockerChecked = true
          resolver(true)
        })
    }
  })
}

module.exports = {
  err,
  isWind,
  checkCobc,
  checkDocker
}
