const http = require('http');
const url = require('url');
const taskManager = require('./taskManager');

function showHelp() {
  console.log(`
Personal Task Manager - Usage:

Commands:
node app.js add "Task Title" "Task Description"  - Add a new task
node app.js list                                  - List all tasks
node app.js complete <taskId>                     - Mark task as complete
node app.js delete <taskId>                       - Delete a task
node app.js server                                - Start HTTP server on port 3000
node app.js help                                  - Show this help message

Examples:
node app.js add "Buy groceries" "Milk, bread, eggs"
node app.js list
node app.js complete 1
node app.js delete 2
node app.js server
  `);
}


// Format date for display
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
  });
}

// Handle add command
function handleAddCommand(args) {
  if (args.length < 4) {
      console.error('Error: Please provide both title and description');
      console.log('Usage: node app.js add "Task Title" "Task Description"');
      process.exit(1);
  }

  const title = args[3];
  const description = args[4] || '';

  try {
      const task = taskManager.addTask(title, description);
      console.log('✓ Task added successfully!');
      console.log(`ID: ${task.id}, Title: "${task.title}"`);
  } catch (error) {
      console.error('Error adding task:', error.message);
      process.exit(1);
  }
}

// Handle list command
function handleListCommand() {
  try {
      const tasks = taskManager.getAllTasks();
      
      if (tasks.length === 0) {
          console.log('No tasks found. Add your first task with:');
          console.log('node app.js add "Task Title" "Task Description"');
          return;
      }

      console.log('=== Your Tasks ===');
      tasks.forEach(task => {
          const status = task.completed ? 'Completed ✓' : 'Pending';
          console.log(`[${task.id}] ${task.title} (${status})`);
          if (task.description) {
              console.log(`    Description: ${task.description}`);
          }
          console.log(`    Created: ${formatDate(task.createdAt)}`);
          console.log('');
      });
  } catch (error) {
      console.error('Error listing tasks:', error.message);
      process.exit(1);
  }
}


// Handle complete command
function handleCompleteCommand(args) {
  if (args.length < 3) {
      console.error('Error: Please provide a task ID');
      console.log('Usage: node app.js complete <taskId>');
      process.exit(1);
  }

  const taskId = args[3];

  try {
      const task = taskManager.markTaskComplete(taskId);
      console.log('✓ Task marked as complete!');
      console.log(`ID: ${task.id}, Title: "${task.title}"`);
  } catch (error) {
      console.error('Error completing task:', error.message);
      process.exit(1);
  }
}

// Handle delete command
function handleDeleteCommand(args) {
  if (args.length < 3) {
      console.error('Error: Please provide a task ID');
      console.log('Usage: node app.js delete <taskId>');
      process.exit(1);
  }

  const taskId = args[3];

  try {
      const task = taskManager.deleteTask(taskId);
      console.log('✓ Task deleted successfully!');
      console.log(`ID: ${task.id}, Title: "${task.title}"`);
  } catch (error) {
      console.error('Error deleting task:', error.message);
      process.exit(1);
  }
}

// Parse JSON from request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      });
      req.on('end', () => {
          try {
              resolve(body ? JSON.parse(body) : {});
          } catch (error) {
              reject(new Error('Invalid JSON in request body'));
          }
      });
      req.on('error', reject);
  });
}

// Handle HTTP server
function startServer() {
  const server = http.createServer(async (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const path = parsedUrl.pathname;
      const method = req.method;

      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      // Handle preflight OPTIONS request
      if (method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
      }

      try {
          if (path === '/' && method === 'GET') {
              // Welcome message
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.end('Welcome to Personal Task Manager API!\n\nEndpoints:\nGET /tasks - Get all tasks\nPOST /tasks - Add a new task\n');
              
          } else if (path === '/tasks' && method === 'GET') {
              // Get all tasks
              const tasks = taskManager.getAllTasks();
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, tasks: tasks }));
              
          } else if (path === '/tasks' && method === 'POST') {
              // Add new task
              try {
                  const body = await parseRequestBody(req);
                  
                  if (!body.title) {
                      res.writeHead(400, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ success: false, error: 'Title is required' }));
                      return;
                  }

                  const task = taskManager.addTask(body.title, body.description || '');
                  res.writeHead(201, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, task: task }));
                  
              } catch (error) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, error: error.message }));
              }
              
          } else {
              // 404 Not Found
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
          }
          
      } catch (error) {
          // 500 Internal Server Error
          console.error('Server error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Internal server error' }));
      }
  });

  const PORT = 3000;
  server.listen(PORT, () => {
      console.log(`🚀 Task Manager server is running on http://localhost:${PORT}`);
      console.log('Available endpoints:');
      console.log('  GET  /       - Welcome message');
      console.log('  GET  /tasks  - Get all tasks');
      console.log('  POST /tasks  - Add new task');
      console.log('\nPress Ctrl+C to stop the server');
  });

  // Handle server errors
  server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
          console.error(`Error: Port ${PORT} is already in use`);
      } else {
          console.error('Server error:', error.message);
      }
      process.exit(1);
  });
}

// Main function to handle command line arguments
function main() {
  const args = process.argv;
  
  if (args.length < 3) {
      showHelp();
      return;
  }

  const command = args[2].toLowerCase();

  switch (command) {
      case 'add':
          handleAddCommand(args);
          break;
      case 'list':
          handleListCommand();
          break;
      case 'complete':
          handleCompleteCommand(args);
          break;
      case 'delete':
          handleDeleteCommand(args);
          break;
      case 'server':
          startServer();
          break;
      case 'help':
      case '--help':
      case '-h':
          showHelp();
          break;
      default:
          console.error(`Error: Unknown command "${command}"`);
          showHelp();
          process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the application
main();