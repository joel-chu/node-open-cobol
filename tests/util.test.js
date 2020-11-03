// testing couple utils methods 

const test = require('ava')

const { getImages } = require('../lib/docker')

test(`Test the docker related methods`, async t => {
	const result = await getImages()
	console.info(result)
	t.truthy(result)
})
