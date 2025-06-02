# Personal Task Manager

A simple command-line and HTTP server-based task management application built with Node.js. This project demonstrates core Node.js concepts including file system operations, custom modules, HTTP servers, and JSON data handling.

## Features

✅ **Command Line Interface** - Manage tasks directly from terminal  
✅ **HTTP REST API** - Web-based task management  
✅ **Persistent Storage** - Tasks saved to JSON file  
✅ **ID Management** - Automatic ID assignment with gap filling  
✅ **Error Handling** - Comprehensive error handling and validation  
✅ **CRUD Operations** - Create, Read, Update, Delete tasks  

## Installation

1. **Clone or download the project**
```bash
mkdir task-manager
cd task-manager
```

2. **Initialize Node.js project**
```bash
npm init -y
```

3. **Create the project files using "touch":**
   - `touch app.js` - Main application
   - `touch taskManager.js` - Task management module
   - `touch tasks.json` - data storage file

4. **Start using the application!**

## Usage

### Command Line Interface

#### Add a new task
```bash
node app.js add "Buy groceries" "Milk, bread, eggs"
```

#### List all tasks
```bash
node app.js list
```

#### Mark task as complete
```bash
node app.js complete 1
```

#### Delete a task
```bash
node app.js delete 2
```

#### Start HTTP server
```bash
node app.js server
```

#### Show help
```bash
node app.js help
```

### HTTP API

Start the server first:
```bash
node app.js server
```

The server runs on `http://localhost:3000`

#### Available Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Welcome message |
| GET    | `/tasks` | Get all tasks |
| POST   | `/tasks` | Add new task |

#### Examples:

**Get all tasks:**
```bash
curl http://localhost:3000/tasks
```

**Add a task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description"}'
```

**Using JavaScript fetch:**
```javascript
fetch('http://localhost:3000/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Learn Node.js',
    description: 'Complete tutorial'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Project Structure

```
task-manager/
├── package.json      # Project configuration
├── app.js            # Main application (CLI + HTTP server)
├── taskManager.js    # Task management module
├── tasks.json        # Data storage (auto-created)
└── README.md         # This file
```

## Task Object Structure

```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Complete the beginner tutorial",
  "completed": false,
  "createdAt": "2025-06-02T15:30:45.123Z"
}
```

## Sample Output

### Adding a task:
```
✓ Task added successfully!
ID: 1, Title: "Buy groceries"
```

### Listing tasks:
```
=== Your Tasks ===
[1] Buy groceries (Pending)
    Description: Milk, bread, eggs
    Created: 6/2/2025, 3:30:45 PM

[2] Learn Node.js (Completed ✓)
    Description: Complete the beginner tutorial
    Created: 6/2/2025, 2:15:30 PM
```

### Server startup:
```
🚀 Task Manager server is running on http://localhost:3000
Available endpoints:
  GET  /       - Welcome message
  GET  /tasks  - Get all tasks
  POST /tasks  - Add new task

Press Ctrl+C to stop the server
```

## Key Learning Concepts

This project demonstrates:

- **Node.js Modules**: Custom modules with exports/imports
- **File System Operations**: Reading and writing JSON files
- **HTTP Server**: Creating REST API endpoints
- **Command Line Args**: Processing `process.argv`
- **Error Handling**: Try-catch blocks and validation
- **JSON Manipulation**: Parsing and stringifying data
- **Asynchronous Operations**: HTTP request handling

## Error Handling

The application includes comprehensive error handling for:

- Invalid command line arguments
- Missing or invalid task IDs
- File read/write errors
- Malformed JSON data
- Server startup issues
- Invalid HTTP requests

## Requirements

- **Node.js**: Version 14.0.0 or higher
- **No external dependencies**: Uses only Node.js built-in modules

## Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "start": "node app.js",
    "server": "node app.js server"
  }
}
```

Then use:
```bash
npm start help
npm run server
```

## Contributing

This is a learning project. Feel free to:

- Add new features (edit tasks, categories, due dates)
- Improve error handling
- Add data validation
- Create a web interface
- Add unit tests

## License

MIT License - Feel free to use this project for learning and development.

---

**Happy Task Managing! 🚀**