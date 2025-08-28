// ## Util
// - concept
// - examples

const util = require('node:util')
const fs = require('node:fs')

const readFile = util.promisify(fs.readFile)

readFile('file.txt').then(console.log).catch(console.error)