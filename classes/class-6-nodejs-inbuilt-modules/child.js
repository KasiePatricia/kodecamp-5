process.on('message', msg => {
	console.log('Child received:', msg)
	process.send('Hi parent, I got your message')
})