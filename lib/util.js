// move the excute promises methods over


/**
 * Take one promise result then pass to the other until the end
 * when one throw then the chain is broken
 * @param {array} promises (or function to return promise)
 * @return {promise}
 */
 function chainPromises(initPromise, ...promises) {
   return (...args) => (
       promises
        .reduce((promiseChain, currentTask) => (
            promiseChain
              .then(chainResult => (
                currentTask(chainResult)
              )
            )
     ), Reflect.apply(initPromise, null, args))
   )
 }


module.exports = { chainPromises }
