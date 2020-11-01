#!/usr/bin/env node
/** 
 * The command line interface
 * This is kind of pointless since the open-cobol runs from command line 
 * Instead this CLI program should call the Docker version, then it will be useful 
 */

const fs = require('fs')
const { resolve } = require('path')
const meow = require('meow')

const openCobol = require('./index')
const { CN_SUFFIX, APP_PATH } = require('./lib/constants')

const cli = meow(`
    Usage
      $ nodecobc <input>
 
    Options
      --keep -k will output the compiled binary to the path you provided 
    
      --cn -c use the CN version of the docker image
    
      --params, -p  Supply argument

      --opts, -o  Options
 
    Examples
      $ nodecobc /path/to/cobol-file.cbl --params a --params b 
`, {
    flags: {
        params: {
          isMultiple: true,
          type: 'string',
          alias: 'p'
        },
        opts: {
          type: 'string',
          alias: 'o'
        }
    }
})

function checkExist(p) {
  return fs.existsSync(resolve(p))
}


// @TODO pass the use docker options 
let _options = {docker: true}
// run
if (cli.input && cli.input[0] && checkExist(cli.input[0])) {
  
  const { params, opts, keep, cn } = cli.flags
  // expecting a path to the directory, therefore need to check if it exists or not
  if (keep) {
    if (!checkExist(keep)) {
      console.error(`Expect the keep flag to provide a directory that exist!`)
      process.exit(1)
    }
    _options = Object.assign(options, { keep })
  }
  if (cn) {
    _options.docker = CN_SUFFIX
  }
  if (params) {
    _options = Object.assign(options, {args: params})
  }
  if (opts) {
    _options = Object.assign(options, { options: opts })
  }
  // run it
  (async () => {
    try {
      const result = await openCobol(cli.input[0], _options)
      console.info(result)
    } catch(e) {
      console.error('nodecobc error:', e)
    }
  })()
} else {
  console.error(`File path required!`)
}


