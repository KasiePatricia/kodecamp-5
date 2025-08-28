#!/usr/bin/env node

import formatter from '@/utils/formatter.js'

class TaskManager {
	constructor() {
		this.commands = new Map()
	}

	async registerCommands() {
		const commandModules = {
			add: (await import('./commands/add.js')).default,
			list: (await import('./commands/list.js')).default,
			// complete:
			// delete:
			// help:
		}

		Object.entries(commandModules).forEach(([name, CommandClass]) => {
			this.commands.set(name, new CommandClass())
		})
	}

	parseArguments(args) {
		if (args.length === 0) {
			return { command: 'help', args: [], options: {} }
		}

		const command = args[0].toLowerCase()
		const commandArgs = args.slice(1)
		const { args: parsedArgs, options } = this.parseOptions(commandArgs)
		return {
			command,
			args: parsedArgs,
			options,
		}
	}

	parseOptions(args) {
		const parsedArgs = []
		const options = {}
		for (let i = 0; i < args.length; i++) {
			const arg = args[i]
			if (arg.startsWith('--')) {
				const optionName = arg.slice(2)
				const nextArg = args[i + 1]
				if (nextArg && !nextArg.startsWith('--')) {
					options[optionName] = nextArg
					i++
				} else {
					options[optionName] = true
				}
			} else {
				parsedArgs.push(arg)
			}
		}
		return { args: parsedArgs, options }
	}

	async executeCommand(commandName, args, options) {
		const command = this.commands.get(commandName)
		if (!command) {
			console.error(formatter.formatError(`Unknown Command: ${commandName}`))
			console.log('')
			console.log(formatter.formatHelp('Available commands:'))
			this.commands.forEach((cmd, name) => {
				console.log(`${formatter.colorize(name, 'bright')} - ${cmd.description}`)
			})
			console.log('')
			console.log(
				formatter.formatHelp("Use 'task-manager help' for more information."),
			)
			return
		}

		try {
			await command.execute(args, options)
		} catch (error) {
			console.error(
				formatter.formatError(
					`Error executing command '${commandName}': ${error.message}`,
				),
			)

			if (command.showUsage) {
				commandName.showUsage()
			}
		}
	}

	async run(args) {
		try {
			await this.registerCommands()
			const { command, args: commandArgs, options } = this.parseArguments(args)
			await this.executeCommand(command, commandArgs, options)
		} catch (error) {
			console.error(formatter.formatError(`Application error: ${error.message}`))
			process.exit(1)
		}
	}

	getCommands() {
		return this.commands
	}

	getCommand(commandName) {
		return this.commands.get(commandName) || null
	}
}

/**
 * Main function
 */

async function main() {
	const taskManager = new TaskManager()
	const args = process.argv.slice(2)
	await taskManager.run(args)
}

process.on('uncaughtException', error => {
	console.error(formatter.formatError(`Uncaught Exception: ${error.message}`))
	console.error(formatter.formatError(error.stack))
	process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
	console.error(formatter.formatError(`Unhandled Rejection at: ${promise}`))
	console.error(formatter.formatError(`Reason: ${reason}`))
	process.exit(1)
})

export default TaskManager

if (import.meta.url === `file://${process.argv[1]}`) {
	main().catch(error => {
		console.error(`Failed to start application: ${error.message}`)
		process.exit(1)
	})
}