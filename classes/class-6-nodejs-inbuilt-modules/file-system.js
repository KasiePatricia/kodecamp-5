// ## File system
// - Concept
// - Write to a file
// - Read from a file
// - Stream large files

const fs = require('node:fs')

const fileName = 'file.txt'

fs.writeFile(fileName, 'Hello Kent', err => {
	if (err) throw err
	console.log('Written to file')

	fs.readFile(fileName, (err, data) => {
		if (err) {
			throw err
		}
		console.log('File content:', data.toString('utf-8'))
	})
})

const readStream = fs.createReadStream(fileName)
readStream.on('data', chunk => {
	console.log('Received', chunk.toString())
})