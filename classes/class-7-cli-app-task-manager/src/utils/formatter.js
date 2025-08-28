/**
 * Handles all output formatting, colors, and display logic
 * for the CLI application.
 * Provides conssitent styling and user friendly output
 */

class Formatter {
	constructor() {
		this.colors = {
			reset: '\x1b[0m',
			bright: '\x1b[1m',
			dim: '\x1b[2m',
			red: '\x1b[31m',
			green: '\x1b[32m',
			yellow: '\x1b[33m',
			blue: '\x1b[34m',
		}

		this.priorityColors = {
			low: this.colors.blue,
			medium: this.colors.yellow,
			high: this.colors.red,
		}

		this.statusSymbols = {
			pending: '⏳',
			completed: '✅',
		}
	}

	/**
	 * Colorize text with specified color
	 * @param {string} text - Text to colorize
	 * @param {string} color - Color name
	 * @returns {string} Colorized text
	 */
	colorize(text, color) {
		const colorCode = this.colors[color] || this.colors.reset
		return `${colorCode}${text}${this.colors.reset}`
	}

	formatTask(task, showId = true) {
		const statusSymbol =
			this.statusSymbols[task.completed ? 'completed' : 'pending']

		const statusColor = task.completed ? 'green' : 'yellow'
		const priorityColor = this.priorityColors[task.priority] || this.colors.white

		let formatted = ''
		if (showId) {
			formatted += `${this.colorize(`#${task.id}`, 'bright')} `
		}

		formatted += `${this.colorize(statusSymbol, statusColor)} `
		formatted += `${task.description} `

		if (task.priority && task.priority !== 'medium') {
			formatted += `${this.colorize(
				`[${task.priority.toUpperCase()}]`,
				priorityColor,
			)}`
		}

		if (task.completed && task.completedAt) {
			const completedDate = new Date(task.completedAt).toLocaleDateString()
			formatted += `${this.colorize(`completed: ${completedDate}`, 'dim')}`
		}

		return formatted
	}

	formstTaskList(tasks, options = {}) {
		if (!tasks || tasks.length === 0) {
			return this.colorize('No tasks found', 'dim')
		}

		const { showId = true, showStats = true } = options
		let output = ''
		if (showStats) {
			const stats = this.calculateStats(tasks)
			output += this.formatStats(stats) + '\n\n'
		}

		tasks.forEach((task, index) => {
			output += `${this.formatTask(task, showId)}`
		})

		return output.trim()
	}

	formatStats(stats) {
		const { total, completed, pending, completionRate } = stats
		let output = this.colorize('📊 Task statistics:', 'bright') + '\n'
		output += `Total: ${this.colorize(total.toString())}\n`
		output += `Completed: ${this.colorize(completed.toString(), 'green')}\n`
		output += `Pending: ${(this.colorize(pending.toString()), 'yellow')}\n`
		output += `Completion Rate: ${this.colorize(`${completionRate}%`)}\n`

		return output
	}

	calculateStats(tasks) {
		const total = tasks.length
		const completed = tasks.filter(task => task.completed).length
		const pending = total - completed
		const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
		return { total, completed, pending, completionRate }
	}

	formatSuccess(message) {
		return `${this.colorize('✅', 'green')} ${this.colorize(message, 'green')}`
	}

	formatError(message) {
		return `${this.colorize('❌', 'red')} ${this.colorize(message, 'red')}`
	}

	formatWarning(message) {
		return `${this.colorize('⚠️', 'yellow')} ${this.colorize(message, 'yellow')}`
	}

	formatInfo(message) {
		return `${this.colorize('ℹ️', 'blue')} ${this.colorize(message, 'blue')}`
	}

	formatHelp(text) {
		return this.colorize(text, 'dim')
	}

	formatUsage(command, usage) {
		return `${this.colorize(command, 'dim')} ${this.colorize(usage, 'blue')}`
	}

	formatTableHeader(headers) {
		return headers.map(header => this.colorize(header, 'bright')).join(' | ')
	}

	formatTableRow(cells) {
		return cells.join(' | ')
	}

	createSeparator(length = 50, character = '-') {
		return this.colorize(character.repeat(length), 'dim')
	}

	formatDate(date) {
		if (!date) return ''
		const dateObj = new Date(date)
		return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
	}

	formatRelativeTime(date) {
		if (!date) return ''
		const now = new Date()
		const dateObj = new Date(date)
		const diffInMs = now - dateObj
		const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
		const diffInHours = Math.floor(diffInMinutes / (1000 * 60 * 60))
		const diffInDays = Math.floor(diffInMinutes / (1000 * 60 * 60 * 24))

		if (diffInMinutes < 1) return 'just now'
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`
		if (diffInHours < 24) return `${diffInHours}h ago`
		if (diffInDays < 7) return `${diffInDays}d ago`

		return this.formatDate(date)
	}

	formatTaskDetails(task) {
		let output = ''
		output += this.colorize('Task Details:', 'bright') + '\n'
		output += `${this.createSeparator(30)}\n`
		output += `ID: ${this.colorize(task.id.toDtring(), 'dim')}\n`
		output += `Description: ${task.description}\n`
		output += `Status: ${this.colorize(
			task.complete ? 'Completed' : 'Pending',
			task.completed ? 'green' : 'yellow',
		)}`
		output += `Priority: ${this.colorize(
			task.priority,
			this.priorityColors[task.priority],
		)}\n`
		output += `Created: ${this.formatDate(task.createdAt)}\n`
		if (task.completed && task.completedAt) {
			output += `Completed: ${this.formatDate(task.completedAt)}\n`
		}

		return output
	}
}

export default new Formatter()