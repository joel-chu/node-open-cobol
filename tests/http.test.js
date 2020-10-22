// testing the http interface
const test = require('ava')
const request = require('superkoa')
const fs = require('fs')
const { helloCbl } = require('./fixtures/data')
const app = require('../http')

test.before(t => {
  t.context.app = app
})

test(`Test the http connection with JSON`, async t => {
  const res = await request(t.context.app)
                      .post('/')
                      .send({cbl: helloCbl})

  console.log('TEST 1', res.body)
  t.is(200, res.status)

})

test(`Send a wrong parameter name and expect it to fail`, async t => {
  const res = await request(t.context.app)
                      .post('/')
                      .send({wrongName: 'whatever'})
  console.log('TEST 2', res.body)
  t.is(403, res.status)
})

test.only(`Last test with the argument parameter`, async t => {
  const prog = fs.readFileSync('./tests/fixtures/args.cbl', {encoding: 'utf8'})
  const res = await request(t.context.app)
                      .post('/')
                      .send({cbl: prog, args: ['Alice']})

  console.log('TEST 3', res.body)

  t.is(200, res.status)
})
