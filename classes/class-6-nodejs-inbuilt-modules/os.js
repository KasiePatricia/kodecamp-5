// ## OS
// - concept
// - examples

const os = require('node:os')

console.log('Free memory', os.freemem() / 1024)
console.log('Uptime (mins)', os.uptime() / 60 / 60)
console.log('CPUs', os.cpus().length)