// couple util methods to work with docker 
const cp = require('child_process')


function getImages() {
  return new Promise((resolver, rejecter) => {
	cp.exec("docker images", (error, stdout, stderr) => {
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


module.exports = { getImages }
