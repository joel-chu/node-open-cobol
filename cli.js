#! /usr/local/bin/node
// The command line interface
const yargs = require('yargs')
const openCobol = require('./index')

// the original node-cobol accept command line input but it really is bs
// what we want is to able to take all the ARGV then run an interactive
// session to accept user input before we execute it
// so this part will be more complex
