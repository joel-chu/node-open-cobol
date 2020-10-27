#!/usr/bin/env node
// The command line interface

const openCobol = require('./index')

// the original node-cobol accept command line input but it really is bs
// what we want is to able to take all the ARGV then run an interactive
// session to accept user input before we execute it
// so this part will be more complex

require('yargs')
  .scriptName("nodecobc")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: null,
      describe: 'The path to the COBOL source (.cbl) file'
    })
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .argv
