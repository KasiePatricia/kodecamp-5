import fileManager from '@/utils/fileManager.js'
import validator from '@/utils/validator.js'
import formatter from '@/utils/formatter.js'

class AddCommand {
	constructor() {
		this.name = 'add'
		this.description = 'Add a new task'
		this.usage = 'add <description> [--priority <level>]'
		this.examples = [
			"add 'Complete project documentation'",
			"add 'Review code changes' --priority high",
			"add 'Update README' --priority low",
		]
	}

	async execute(args, options = {}) {
		try {
			const argsValidation = validator.validateArgs(args, 1, 1)
			if (!argsValidation.isValid) {
				console.error(formatter.formatError(argsValidation.error))
				this.showUsage()
				return
			}

			const description = args[0]
			const priority = options.priority

			const descriptionValidation = validator.validateDescription(description)
			if (!descriptionValidation.isValid) {
				console.error(formatter.formatError(descriptionValidation.error))
				return
			}

			const priorityValidation = validator.validatePriority(priority)
			if (!priorityValidation.isValid) {
				console.error(formatter.formatError(priorityValidation.error))
				return
			}

			const task = await fileManager.addTask({
				description: descriptionValidation.value,
				priority: priorityValidation.value,
				completed: false,
			})
			console.log(formatter.formatSuccess('Task added successfully!'))
			console.log(formatter.formatTask(task))
		} catch (error) {
			console.error(formatter.formatError(`Error: ${error.message}`))
		}
	}
	showUsage() {
		console.log('\n' + formatter.formatHelp('Usage:'))
		console.log(`  ${formatter.formatUsage(this.name, this.usage)}`)
		console.log('\n' + formatter.formatHelp('Options:'))
		console.log('  --priority <level> Set priority (low, medium, high)')
	}
}

export default AddCommand