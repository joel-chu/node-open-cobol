// this test will not get run automatically
// we run this manually for TBD

const test = require('ava')
// const tmp = require('tmp')
const main = require('../index')
const { compile } = require('../lib/run')
const { helloCbl } = require('./fixtures/data')
const { prepareInput } = require('../lib/input')

const fs = require('fs')

test.skip(`Test the compile method`, async t => {

  const [pathToFile, params] = await prepareInput(helloCbl)

  const pathToBin = await compile(pathToFile, params)

  t.true(fs.existsSync(pathToBin))

})

test(`Test the whole thing end to end`, async t => {

  const result = await main(helloCbl)

  t.is(result.trim(), 'Hello world')
})
