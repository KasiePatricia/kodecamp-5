// ## Asynchronous Code Error Handling
// - Try-Catch Limitations with Async code
// - Error Propagation in Callback Chain
// - Global Error Handling

// function badErrorHandling() {
// 	fs.readFile('filename', (err, data) => {
// 		if (err) {
// 			console.log(err)
// 		}
// 		console.log(data)
// 	})
// }


// - Global Error Handling
process.on('uncaughtException', err => {})
process.on('unhandledRejection', err => {})
process.on('SIGTERM', err => {})