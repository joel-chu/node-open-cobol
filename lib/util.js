// move the excute promises methods over


/**
 * A cut down version from the jsonql-utils, it will only return array of results
 * @param {array} promises (or function to return promise)
 * @return {promise}
 */
function chainPromises(promises) {
  return promises.reduce((promiseChain, currentTask) => (
    promiseChain.then(chainResults => (
      currentTask.then(currentResult => (
        [...chainResults, currentResult]
      ))
    ))
  ), Promise.resolve(
    [] // to hold the result array
  ))
}


module.exports = { chainPromises }
