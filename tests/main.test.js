const test = require('ava')

const { isWind, checkCobc } = require('../lib/check')


test(`Check if this check method works correctly`, t => {
  t.false(isWind(), 'It should not run on windows os')
})
