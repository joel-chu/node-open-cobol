#!/usr/bin/env node
/** 
 * The command line interface
 * This is kind of pointless since the open-cobol runs from command line 
 * Instead this CLI program should call the Docker version, then it will be useful 
 */

const fs = require('fs')
const meow = require('meow')

const request = require('@to1source/request')
const { CN_SUFFIX, APP_PATH, ARG, DEFAULT_PORT } = require('./lib/constants')
const { checkExist, readCblFile } = require('./lib/input')


const cli = meow(`
    Usage
      $ nodecobc <input>
 
    Options
      --port -p the port that map to the docker image 
    
      --args -a (optional) Supply argument
 
    Examples
      $ nodecobc /path/to/cobol-file.cbl --port 40196 --args argument1 --args argument2 
`, {
    flags: {
        args: {
          isMultiple: true,
          type: 'string',
          alias: 'a'
        },
        port: {
          type: 'number',
          alias: 'p',
          default: DEFAULT_PORT 
        }
    }
})

// run

let _options = {}

if (cli.input && cli.input[0] && checkExist(cli.input[0])) {
  
  const { port, args } = cli.flags

  if (!port) {
    console.error(`Port must be provided!`)
    process.exit(1)
  }

  if (args) {
    _options = Object.assign(_options, { args })
  }

  // run it
  (async () => {
    try {
      
      const cblCode = await readCblFile(cli.input[0])

      console.info(`got COBOL code`)

      // we only do the localhost for the time being @TODO add new flag? 
      const url = [HOSTNAME, port].join(':')
      
      console.info(`Post it to ${url}`)

      const result = await request(url).post({[ARG]: cblCode})
      
      console.info(result)
    } catch(e) {
      console.error('nodecobc error:', e)
    }
  })()
} else {
  console.error(`File path required!`)
}


