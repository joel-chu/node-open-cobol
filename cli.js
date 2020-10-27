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

const cli = meow(`
    Usage
      $ nodecobc <input>
 
    Options
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

// @TODO pass the use docker options 
let _options = {docker: true}
// run
if (cli.input && cli.input[0] && fs.existsSync(resolve(cli.input[0]))) {
  
  const { params, opts } = cli.flags
     
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


