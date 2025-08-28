/**
 * File Manager Utitlity
 *
 * Handles file system operations for the task manager.
 * This module is responsible for reading, writing, and managing the tasks data file
 */
import { promises as fs } from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)

class FileManager {
	constructor() {
		this.dataDir = path.join(os.homedir(), 'kc-task-manager')
		this.dataFile = path.join(this.dataDir, 'tasks.json')
		this.ensureDataDirectory()
	}

	/**
	 * Ensure the data directory exists
	 */
	async ensureDataDirectory() {
		try {
			await fs.access(this.dataDir)
		} catch (error) {
			await fs.mkdir(this.dataDir, { recursive: true })
		}
	}

	/**
	 * Read all tasks from the data file
	 * @returns {Array} Array of tasks
	 */
	async readTasks() {
		try {
			const data = await fs.readFile(this.dataFile, 'utf8')
			return JSON.parse(data)
		} catch (error) {
			if (error.code === 'ENOENT') {
				return []
			}
			throw new Error(`Failed to read tasks: ${error.message}`)
		}
	}

	async writeTasks(tasks) {
		try {
			await this.ensureDataDirectory()
			await fs.writeFile(this.dataFile, JSON.stringify(tasks, null, 2))
		} catch (error) {
			throw new Error(`Failed to write tasks: ${error.message}`)
		}
	}

	async addTask(task) {
		const tasks = await this.readTasks()
		const newTask = {
			id: this.generateId(tasks),
			...task,
			createdAt: new Date().toISOString(),
			completedAt: null,
		}
		tasks.push(newTask)
		await this.writeTasks(tasks)
		return newTask
	}

	async updateTask(id, updates) {
		const tasks = await this.readTasks()
		const taskIndex = tasks.findIndex(task => task.id === id)
		if (taskIndex === -1) {
			return null
		}
		let taskAtIndex = tasks[taskIndex]
		taskAtIndex = { ...taskAtIndex, ...updates }
		tasks.push(taskAtIndex)
		await this.writeTasks(tasks)
		return taskAtIndex
	}

	async deleteTask(id) {
		const tasks = await this.readTasks()
		const initialLength = tasks.length
		const filteredTasks = tasks.filter(task => task.id !== id)

		if (filteredTasks.length === initialLength) {
			return false
		}
		await this.writeTasks(filteredTasks)
		return true
	}

	async getTask(id) {
		const tasks = await this.readTasks()
		return tasks.find(task => task.id === id) ?? null
	}

	async getStats() {
		const tasks = await this.readTasks()
		const total = tasks.length
		const completed = tasks.filter(task => task.completed).length
		const pending = total - completed
		return {
			total,
			completed,
			pending,
			completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
		}
	}

	async clearAllTasks() {
		await this.writeTasks([])
	}

	generateId(tasks) {
		if (tasks.length === 0) return 1
		const maxId = Math.max(...tasks.map(task => task.id))
		return maxId + 1
	}
}

export default new FileManager()

console.log(Math.max(...[1, 2, 3]))