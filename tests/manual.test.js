// this test will not get run automatically
// we run this manually for TBD

const test = require('ava')
// const tmp = require('tmp')
const main = require('../index')

const helloCbl =
`       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       PROCEDURE DIVISION.
       PROGRAM-BEGIN.
       DISPLAY "Hello world".
       PROGRAM-DONE.
       STOP RUN.
`

test(`Try to see if it actually able to pass the COBOL to the cboc`, async t => {

  const result = await main(helloCbl)

  console.log(result)

  t.truthy(result)


})
