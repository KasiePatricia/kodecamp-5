// ## Child Process
// - concept
// - exec
// - spawn
// - fork

const { exec } = require('child_process')

exec('ls -la', (err, stdout) => {
	if (err) return console.error(err)
	console.log(stdout)
})