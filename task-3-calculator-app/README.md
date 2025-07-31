# Node.js Calculator App

A comprehensive command-line calculator application built with Node.js that performs basic and advanced arithmetic operations with interactive user input handling.

## Features

### Basic Operations
- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)

### Advanced Operations
- Power (^)
- Square Root (√)
- Percentage calculations

### Enhanced Features
- **Calculation History**: View all previous calculations with timestamps
- **Previous Result Usage**: Use "last" keyword to reference the previous calculation result
- **Input Validation**: Robust validation for all user inputs
- **Error Handling**: Comprehensive error handling with clear error messages
- **Graceful Exit**: Clean shutdown with Ctrl+C support

## Prerequisites

- Node.js version 14.0.0 or higher
- Basic understanding of command line/terminal

## Installation

1. **Create project directory:**
   ```bash
   mkdir calculator-app
   cd calculator-app
   ```

2. **Initialize the project:**
   ```bash
   npm init -y
   ```

3. **Create the main file:**
   ```bash
   touch calculator.js
   ```

4. **Copy the calculator code** into `calculator.js`

5. **Update package.json** to include `"type": "module"` for ES6 module support

## Usage

### Starting the Calculator

```bash
npm start
```

or

```bash
node calculator.js
```

### Example Interaction

```
Welcome to Node.js Calculator!
=====================================

Select operation:
1. Add
2. Subtract
3. Multiply
4. Divide
5. Power
6. Square Root
7. Percentage
8. Show History
9. Clear History
10. Exit

💡 Last result: 25

Enter choice (1-10): 1
Enter first number (or "last" to use previous result): last
Enter second number: 10

✅ Result: 25 + 10 = 35
```

### Special Keywords

- **"last"**: Use the result from the previous calculation
- **Ctrl+C**: Gracefully exit the application

## Input Validation

The calculator includes comprehensive input validation:

- **Empty inputs**: Prompts user to enter a value
- **Non-numeric inputs**: Rejects letters and special characters
- **Division by zero**: Prevents division by zero with clear error message
- **Square root of negative numbers**: Handles mathematical impossibilities
- **Invalid menu choices**: Guides user to valid options

## Error Handling

- Try-catch blocks for all operations
- Graceful handling of unexpected errors
- Clear, user-friendly error messages
- Automatic retry on invalid input
- Safe process termination

## Code Organization

### Function Categories

1. **Mathematical Operations**
   - `add()`, `subtract()`, `multiply()`, `divide()`
   - `power()`, `sqrt()`, `percentage()`

2. **User Interface**
   - `displayWelcomeMessage()`
   - `showAvailableOperations()`
   - `mainMenuLoop()`

3. **Input/Output Handling**
   - `promptOperationChoice()`
   - `getTwoNumbers()`, `getSingleNumber()`
   - `validateNumbers()`, `validateAndParseNumber()`

4. **Utility Functions**
   - `handleInvalidInput()`
   - `addToHistory()`, `showHistory()`, `clearHistory()`
   - `performCalculation()`

## Testing Scenarios

Test your calculator with these scenarios:

### Normal Operations
- Positive numbers: `5 + 3 = 8`
- Negative numbers: `-5 + 3 = -2`
- Decimals: `2.5 * 4 = 10`

### Edge Cases
- Division by zero: `10 / 0` → Error message
- Square root of negative: `√-4` → Error message
- Very large numbers: `999999 * 999999`

### Invalid Inputs
- Letters: `abc + 5` → Error message
- Special characters: `@#$ * 2` → Error message
- Empty inputs: `` → Error message

### Advanced Features
- Using previous result: `last + 5`
- Viewing history: Choose option 8
- Clearing history: Choose option 9

## File Structure

```
calculator-app/
├── calculator.js    # Main application file
├── package.json     # Project configuration
└── README.md       # This file
```

## Dependencies

This project uses only Node.js built-in modules:
- `readline` for command-line input/output
- No external dependencies required

## Contributing

Feel free to fork this project and submit pull requests for improvements.

## License

MIT License - feel free to use this code for educational purposes.

## Troubleshooting

### Common Issues

1. **"Cannot use import statement"**
   - Ensure `"type": "module"` is in your package.json

2. **Calculator doesn't start**
   - Check Node.js version: `node --version`
   - Ensure you're in the correct directory

3. **Input not working**
   - Make sure your terminal supports interactive input
   - Try running in a different terminal/command prompt

### Getting Help

If you encounter issues:
1. Check the error message carefully
2. Ensure all prerequisites are met
3. Verify file permissions and directory structure