// couple util methods to work with docker 
const cp = require('child_process')


function getImages() {
	cp.exec("docker images", (error, stdout, stderr) => {
		console.log(stdout)
	})
}


module.exports = { getImages }
