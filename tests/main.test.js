const test = require('ava')

const { isWind, checkCobc } = require('../lib/check')
const { getInput } = require('../lib/input')


// this test should only run here
test.skip(`Test if the check cboc command works on Linux`, async t => {
  const result = await checkCobc()
  t.truthy(result)
})


test(`Check if this check method works correctly`, t => {
  t.false(isWind(), 'It should not run on windows os')
})

test(`Testing the input with failed input`, async t => {
  // expect to fail

  const error = await t.throwsAsync(getInput('/path/to/bullshit'))
  t.truthy(error)


  const error1 = await t.throwsAsync(getInput({}))
  t.truthy(error1)
})
