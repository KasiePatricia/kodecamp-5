#!/usr/bin/env node

import { fileURLToPath } from 'url'
import path from 'path'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mainPath = path.join(__dirname, '..', 'src', 'index.js')
const child = spawn('node', [mainPath, ...process.argv.slice(2)], {
	stdio: 'inherit',
	cwd: process.cwd(),
})

child.on('close', code => {
	process.exit(code)
})

child.on('error', error => {
	console.error(`Error running task-manager: ${error.message}`)
	process.exit(1)
})