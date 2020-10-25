// testing the HTTP interface with Docker 
const test = require('ava')


test.before(async t => {
	console.info(`RUN BEFORE TEST START`)
})

test.after(async t => {
	console.info(`RUN AFTER TEST END`)
})

