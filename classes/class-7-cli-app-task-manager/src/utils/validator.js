class Validator {
	validateDescription(description) {
		if (!description || typeof description !== 'string') {
			return {
				isValid: false,
				error: 'Task description is required and must be a string',
			}
		}
		const trimmed = description.trim()

		if (trimmed.length === 0) {
			return {
				isValid: false,
				error: 'Task description cannot be empty',
			}
		}

		if (trimmed.length > 500) {
			return {
				isValid: false,
				error: 'Task description cannot exceed 500 characters',
			}
		}

		return {
			isValid: true,
			value: trimmed,
		}
	}

	validatePriority(priority) {
		const validPriorities = ['low', 'medium', 'high']
		if (!priority) {
			return {
				isValid: true,
				value: 'medium',
			}
		}

		const normalizedPriority = priority.toLowerCase()
		if (!validPriorities.includes(normalizedPriority)) {
			return {
				isValid: false,
				error: `Prority must be one of ${validPriorities.join(',')}`,
			}
		}
		return {
			isValid: true,
			value: normalizedPriority,
		}
	}

	validateId(id) {
		if (id === undefined || id === null) {
			return {
				isValid: false,
				error: 'Task ID is required',
			}
		}

		const numId = parseInt(id, 10)
		if (Number.isNaN(numId)) {
			return {
				isValid: false,
				error: 'Task ID must be a valid number',
			}
		}

		if (numId <= 0) {
			return {
				isValid: false,
				error: 'Task ID must be a positive number',
			}
		}

		return {
			isValid: true,
			value: numId,
		}
	}

	validateStatus(status) {
		const validStatuses = ['all', 'pending', 'completed']
		if (!status) {
			return {
				isValid: true,
				value: 'all',
			}
		}

		const normalizedStatus = status.toLowerCase().trim()
		if (!validStatuses.includes(normalizedStatus)) {
			return {
				isValid: false,
				error: `Status must be one of ${validStatuses.join(',')}`,
			}
		}

		return {
			isValid: true,
			value: normalizedStatus,
		}
	}

	validatePriorityFilter(priority) {
		const validPriorities = ['all', 'low', 'medium', 'high']
		if (!priority) {
			return {
				isValid: true,
				value: 'all',
			}
		}

		const normalizedPriority = priority.toLowerCase().trim()

		if (!validPriorities.includes(normalizedPriority)) {
			return {
				isValid: false,
				error: `Priority filter must be one of ${validPriorities.join(',')}`,
			}
		}

		return {
			isValid: true,
			value: normalizedPriority,
		}
	}

	validateArgs(args, minArgs = 0, maxArgs = Infinity) {
		if (!Array.isArray(args)) {
			return {
				isValid: false,
				error: 'Arguments must be an array',
			}
		}

		if (args.length < minArgs) {
			return {
				isValid: false,
				error: `At least ${minArgs} argument(s) is required`,
			}
		}

		if (args.length > maxArgs) {
			return {
				isValid: false,
				error: `Maximum ${maxArgs} argument(s) allowed`,
			}
		}

		return {
			isValid: true,
			value: args,
		}
	}

	validaDate(dateString) {
		if (!dateString) {
			return {
				isValid: false,
				error: 'Date is required',
			}
		}

		const date = new Date(dateString)
		if (isNaN(date.getTime())) {
			return {
				isValid: false,
				error: 'Invalid date format',
			}
		}
		return {
			isValid: true,
			error: date.toISOString(),
		}
	}

	validateTaskObject(task) {
		if (!task || typeof task !== 'object') {
			return {
				isValid: false,
				error: 'Task must be an object',
			}
		}

		const requiredFields = ['description']
		const missingFields = requiredFields.filter(field => !task[field])

		if (missingFields.length > 0) {
			return {
				isValid: false,
				error: `Missing required fields ${missingFields.join(',')}`,
			}
		}

		const validDescription = this.validateDescription(task.description)
		if (!validDescription.isValid) {
			return validDescription
		}

		if (task.priority) {
			const priorityValidation = this.validatePriority(task.priority)
			if (!priorityValidation.isValid) {
				return priorityValidation
			}
		}

		return {
			isValid: true,
			value: task,
		}
	}

	sanitizeString(input) {
		if (typeof input !== 'string') {
			return ''
		}

		return input.trim().replace(/\s+/g, ' ').replace(/[<>]/g, '')
	}
}

export default new Validator()