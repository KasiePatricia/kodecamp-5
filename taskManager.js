const fs = require('fs');
const path = require('path');

// File path for storing tasks
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// In-memory task storage
let tasks = [];
let nextId = 1;

// Load tasks from file
function loadTasksFromFile() {
  try {
      if (fs.existsSync(TASKS_FILE)) {
          const data = fs.readFileSync(TASKS_FILE, 'utf8');
          const parsed = JSON.parse(data);
          tasks = parsed.tasks || [];
          nextId = parsed.nextId || 1;
      } else {
          // this function is called if the tasks.json file does not exist, which is the first time the program is run
          saveTasksToFile();
      }
  } catch (error) {
      console.error('Error loading tasks from file:', error.message);
      tasks = [];
      nextId = 1;
  }
}

// Save tasks to file
function saveTasksToFile() {
  try {
      const data = {
          tasks: tasks,
          nextId: nextId
      };
      fs.writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
      console.error('Error saving tasks to file:', error.message);
      throw error;
  }
}

// Add a new task
// the parameters are the title and description of the task and the function returns the created task
function addTask(title, description) {
  if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title is required and must be a non-empty string');
  }

  const task = {
      id: nextId++,
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString()
  };

  tasks.push(task);
  saveTasksToFile();
  return task;
}

// Get all tasks
// the function returns an array of all tasks (copy of the tasks array to prevent external modification)
function getAllTasks() {
  return [...tasks];
}

// Mark a task as complete
// the parameter is the id of the task and the function returns the updated task
function markTaskComplete(taskId) {
  const id = parseInt(taskId);
  if (isNaN(id)) {
      throw new Error('Task ID must be a valid number');
  }

  const task = tasks.find(task => task.id === id);
  if (!task) {
      throw new Error(`Task with ID ${id} not found`);
  }

  task.completed = true;
  saveTasksToFile();
  return task;
}

// Delete a task
// the parameter is the id of the task and the function returns the deleted task
function deleteTask(taskId) {
  const id = parseInt(taskId);
  if (isNaN(id)) {
      throw new Error('Task ID must be a valid number');
  }

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  saveTasksToFile();
  return deletedTask;
}

// Get a task by ID
// the parameter is the id of the task and the function returns the task or null if not found
function getTaskById(taskId) {
  const id = parseInt(taskId);
  if (isNaN(id)) {
      return null;
  }
  return tasks.find(task => task.id === id) || null;
}

// Initialize tasks on module load
loadTasksFromFile();

module.exports = {
  addTask,
  getAllTasks,
  markTaskComplete,
  deleteTask,
  saveTasksToFile,
  loadTasksFromFile,
  getTaskById
};