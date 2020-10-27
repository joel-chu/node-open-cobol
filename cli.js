#!/usr/bin/env node
// The command line interface

const openCobol = require('./index')

// the original node-cobol accept command line input but it really is bs
// what we want is to able to take all the ARGV then run an interactive
// session to accept user input before we execute it
// so this part will be more complex

const { argv } = require('yargs')


console.log(argv)

/*
require('yargs')
  .scriptName("nodecobc")
  .usage('$0 <cmd> [args]')
  .command('nodecobc [file]', 'Please provide path to your COBOL file', (yargs) => {
    yargs.positional('file', {
      type: 'string',
      default: null,
      describe: 'The path to the COBOL source (.cbl) file'
    })
  }, function (argv) {
    
    console.log('argv', argv)
  })
  .help()
  .argv
*/
