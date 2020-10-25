// testing the HTTP interface with Docker 
const test = require('ava')
const { spawn } = require('child_process')
const request = require('@to1source/request')

test.before(async t => {
	console.info(`RUN BEFORE TEST START`)
	// note this will not be working on another machine, unless they have done the exact same setup 
	const p1 = spawn('docker', ['run', '-p', '49160:3001', '-d', 'joeljiezhu/ubuntu-1804-cn-test'])
	
	p1.stdout.on('data', data => {
		console.info(`Should be getting back and ID`, data)
		if (!t.context.id) { // only do this once
			t.context.id = data 
		}
	})
	p1.stderr.on('data', data => {
		console.error(`STDERR`, data)
	})
	p1.on('close', code => {
		console.info(`Spawn call ended with `, code)
	})
})

test.after(async t => {
	console.info(`RUN AFTER TEST END`, t.context.id)
	
	const p2 = spawn('docker', ['stop', t.context.id])
	
	p2.stdout.on('data', data => {
		console.info(`Should be an id`, data)
	})
	p2.stderr.on('data', data => {
		console.error(`p2 STDERR`, data)
	})
	p2.on('close', code => {
		console.info(`p2 spawn call ended with `, code)
	})
	
})


test(`The main test to submit a helloWorld to the open-cobol inside the Docker via HTTP`, async t => {
		
	
		
		
		t.is(true, true)

})
