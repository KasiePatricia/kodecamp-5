const fs = require('fs').promises;
const path = require('path');

// Task 1: Read and Display File Contents
const readFileAsync = async (filename) => {
  const filePath = path.join(__dirname, 'test-files', filename);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    console.log(`File Contents: ${data}. Successfully read ${filename}`);
    return data;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Error: File '${filename}' not found`);
    } else {
      console.log(`Error reading file '${filename}': ${error.message}`);
    }
    return null;
  }
};

// Test Cases

// Case 1: Reading an existing file
readFileAsync('sample.txt');

// Case 2: Reading a non-existing file
readFileAsync('nonexistent.txt');

/* Sample Output:
  Error: File 'nonexistent.txt' not found
  File Contents: Hello World!. Successfully read sample.txt
*/



// Task 2: Write Content to File
const writeFileAsync = async (filename, content) => {
  const filePath = path.join(__dirname, 'test-files', filename);

  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Successfully wrote to file '${filename}'`);
  } catch (error) {
    if (error.code === 'EACCES') {
      console.error(`Permission denied while writing to '${filename}'`);
    } else {
      console.error(`Error writing to file '${filename}': ${error.message}`);
    }
  }
};

// Test Case
writeFileAsync('output.txt', 'This is my task submission');

/* Sample Output:
  Successfully wrote to file 'output.txt'
*/



// Task 3: Copy File from Source to Destination
const copyFileAsync = async (source, destination) => {
  const sourcePath = path.join(__dirname, 'test-files', source);
  const destinationDir = path.join(__dirname, 'test-files', path.dirname(destination));
  const destinationPath = path.join(__dirname, 'test-files', destination);

  try {
    // Check if source exists
    await fs.access(sourcePath);
    
    // Ensure destination directory exists
    await fs.mkdir(destinationDir, { recursive: true });

    // Copy file
    await fs.copyFile(sourcePath, destinationPath);
    console.log(`Successfully copied '${source}' to '${destination}'`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Source file '${source}' does not exist`);
    } else {
      console.error(`Error copying file: ${error.message}`);
    }
  }
};

// Test Case
copyFileAsync('sample.txt', 'backup/sample_backup.txt');

/* Sample Output:
  Successfully copied 'sample.txt' to 'backup/sample_backup.txt'
*/



// Task 4: Append Content to Existing File
const appendFileAsync = async (filename, content) => {
  const filePath = path.join(__dirname, 'test-files', filename);

  try {
    let originalContent = '';
    
    // Try reading original content (if file exists)
    try {
      originalContent = await fs.readFile(filePath, 'utf8');
      console.log(`Original contents of '${filename}':\n${originalContent}`);
    } catch (readErr) {
      if (readErr.code === 'ENOENT') {
        console.log(`File '${filename}' does not exist yet. It will be created.`);
      } else {
        throw readErr;
      }
    }

    // Append new content
    await fs.appendFile(filePath, content, 'utf8');
    console.log(`Appended new content to '${filename}'`);

    // Read updated content
    const updatedContent = await fs.readFile(filePath, 'utf8');
    console.log(`Updated contents of '${filename}':\n${updatedContent}`);
  } catch (error) {
    console.error(`Error appending to file '${filename}': ${error.message}`);
  }
};

// Test Case
appendFileAsync('output.txt', '\nAppended line 1\nAppended line 2');

/* Sample Output:
  Original contents of 'output.txt':
  This is my task submission

  Appended new content to 'output.txt'

  Updated contents of 'output.txt':
  This is my task submission
  Appended line 1
  Appended line 2
*/



// Task 5: List Directory Contents
const listDirectoryAsync = async (dirPath) => {
  const fullPath = path.join(__dirname, dirPath);

  try {
    const entries = await fs.readdir(fullPath);
    const details = [];

    for (const entry of entries) {
      const entryPath = path.join(fullPath, entry);
      try {
        const stat = await fs.stat(entryPath);
        details.push({
          name: entry,
          type: stat.isDirectory() ? 'directory' : 'file',
          size: stat.size,
        });
      } catch (err) {
        console.warn(`Could not access ${entry}: ${err.message}`);
      }
    }

    // Sort alphabetically by name
    details.sort((a, b) => a.name.localeCompare(b.name));

    console.log(`Contents of '${dirPath}':`);
    details.forEach((item) => {
      console.log(`- ${item.name} (${item.type}, ${item.size} bytes)`);
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Directory '${dirPath}' not found.`);
    } else {
      console.error(`Error reading directory '${dirPath}': ${err.message}`);
    }
  }
};

// Test Cases
listDirectoryAsync('.'); // current project directory
listDirectoryAsync('test-files');

/* Sample Output:
  Contents of 'test-files':
  - backup (directory, 96 bytes)
  - output.txt (file, 58 bytes)
  - sample.txt (file, 12 bytes)

  Contents of '.':
  - .DS_Store (file, 6148 bytes)
  - filesystem-operations.js (file, 7446 bytes)
  - package.json (file, 221 bytes)
  - test-files (directory, 160 bytes)
*/



// Task 6: Create and Delete Operations

// 1. Create Directory
const createDirectoryAsync = async (dirPath) => {
  const fullPath = path.join(__dirname, 'test-files', dirPath);

  try {
    await fs.mkdir(fullPath, { recursive: true });
    console.log(`Directory '${dirPath}' created successfully.`);
  } catch (err) {
    console.error(`Error creating directory '${dirPath}': ${err.message}`);
  }
};

// 2. Create File with Content
const createFileAsync = async (filename, content) => {
  const filePath = path.join(__dirname, 'test-files', filename);

  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`File '${filename}' created with content.`);
  } catch (err) {
    console.error(`Error creating file '${filename}': ${err.message}`);
  }
};

// 3. Delete File
const deleteFileAsync = async (filename) => {
  const filePath = path.join(__dirname, 'test-files', filename);

  try {
    await fs.unlink(filePath);
    console.log(`File '${filename}' deleted.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`File '${filename}' does not exist.`);
    } else {
      console.error(`Error deleting file '${filename}': ${err.message}`);
    }
  }
};

// 4. Delete Empty Directory
const deleteDirectoryAsync = async (dirPath) => {
  const fullPath = path.join(__dirname, 'test-files', dirPath);

  try {
    await fs.rmdir(fullPath);
    console.log(`Directory '${dirPath}' deleted.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`Directory '${dirPath}' does not exist.`);
    } else if (err.code === 'ENOTEMPTY') {
      console.error(`Directory '${dirPath}' is not empty.`);
    } else {
      console.error(`Error deleting directory '${dirPath}': ${err.message}`);
    }
  }
};

// Test case
(async () => {
  await createDirectoryAsync('temp'); // Step 1
  await createFileAsync('temp/test.txt', 'temporary file'); // Step 2
  await deleteFileAsync('temp/test.txt'); // Step 3
  await deleteDirectoryAsync('temp'); // Step 4
})();

/*
  Sample Output:
  Directory 'temp' created successfully.
  File 'temp/test.txt' created with content.
  File 'temp/test.txt' deleted.
  Directory 'temp' deleted.
*/

