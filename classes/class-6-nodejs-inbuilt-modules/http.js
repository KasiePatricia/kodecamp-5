// ## HTTP/HTTPS
// - concept
// - examples

const http = require('http')

http
	.createServer((req, res) => {
		if (req.url === '/json') {
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'Hi from server' }))
		} else {
			res.writeHead(200, { 'Content-Type': 'text/plain' })
			res.end('Welcome to our server')
		}
	})
	.listen(3002)
console.log('Server running on port 3000')