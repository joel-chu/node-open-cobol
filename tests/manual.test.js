// this test will not get run automatically
// we run this manually for TBD

const test = require('ava')
// const tmp = require('tmp')
const main = require('../index')
const { compile } = require('../lib/run')
const { helloCbl } = require('./fixtures/data')
const { prepareInput } = require('../lib/input')

const fs = require('fs')
const path = require('path')

test.skip(`Test the compile method`, async t => {

  const [pathToFile, params] = await prepareInput(helloCbl)

  const pathToBin = await compile(pathToFile, params)

  t.true(fs.existsSync(pathToBin))

})

test.skip(`Test COBOL code input end to end`, async t => {

  const result = await main(helloCbl)

  t.is(result.trim(), 'Hello world')
})

test.skip(`Test COBOL file end to end`, async t => {
  const { resolve, join } = path
  const pathToFile = resolve(join('tests', 'fixtures', 'args.cbl'))

  console.log('pathToFile', pathToFile)

  const result = await main(pathToFile, { args: ['alice'] })

  console.log(result)

  t.true(result.indexOf('alice') > -1)

})
