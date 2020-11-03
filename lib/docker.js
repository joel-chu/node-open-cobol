// couple util methods to work with docker 
const cp = require('child_process')
const { DOCKER_NAME, IMAGE_NAME, DEFAULT_DOCKER_IMAGE } = require('./constants')

/**
 * List all images
 * @return {array} images 
 */ 
function getImages() {
  return new Promise((resolver, rejecter) => {
	cp.exec(`${DOCKER_NAME} ${IMAGE_NAME}`, (error, stdout, stderr) => {
		//console.log(stdout)
		//console.log(stderr)
	  if (error || stderr) {
		console.error('error', error)
		console.error('stderr', stderr)
		return rejecter(error || stderr)
	  }
	  // process the stdout 
	  const lines = stdout.split('\n')
				.filter(line => line.trim() !== '')
				.map(line => line.split(' ')
							.map(col => col.trim())
							.filter(col => col !== '') 
				)
				.map(line => line[0])
	  resolver(lines)
	})
  })
}

/**
 * find that particular image if existed
 * @param {string} [imageName = DEFAULT_DOCKER_IMAGE] the image name to find
 * @return {boolean | string}
 */ 
function findImage(imageName = DEFAULT_DOCKER_IMAGE) {
  return getImages()
			.then(images => images.filter(img => img === imageName))
			.then(images => images[0] || false)
}



module.exports = { getImages, findImage }
