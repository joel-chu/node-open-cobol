// this test will not get run automatically
// we run this manually for TBD

const test = require('ava')
const tmp = require('tmp')

test(`Try to see if it actually able to pass the COBOL to the cboc`, t => {
  const tmpobj = tmp.fileSync();
  console.log('File: ', tmpobj.name);
  console.log('Filedescriptor: ', tmpobj.fd);

// If we don't need the file anymore we could manually call the removeCallback
// But that is not necessary if we didn't pass the keep option because the library
// will clean after itself.
// tmpobj.removeCallback();

  t.pass()

})
