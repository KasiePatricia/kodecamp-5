import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store calculation history
let calculationHistory = [];
let lastResult = null;

// Basic math functions
const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
}

const subtract = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a - b;
}

const multiply = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a * b;
}

// Division with zero check
const divide = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

// Power function using Math.pow
const power = (base, exponent) => {
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return Math.pow(base, exponent);
}

// Square root with negative number check
const sqrt = (value) => {
  if (typeof value !== 'number') {
    throw new Error('Argument must be a number');
  }
  if (value < 0) {
    throw new Error('Cannot find square root of negative number');
  }
  return Math.sqrt(value);
}

// Calculate what percentage of a number
const percentage = (value, percentage) => {
  if (typeof value !== 'number' || typeof percentage !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return (value * percentage) / 100;
}

// Display functions
const showWelcomeMessage = () => {
  console.log("Welcome to Node.js Calculator!");
}

const showAvailableOperations = () => {
  console.log("\nSelect an operation:");
  console.log('1. Add');
  console.log('2. Subtract');
  console.log('3. Multiply');
  console.log('4. Divide');
  console.log('5. Power');
  console.log('6. Square Root');
  console.log('7. Percentage');
  console.log('8. Show History');
  console.log('9. Clear History');
  console.log('10. Exit');
}

// Get user choice from menu
const promptOperationChoice = () => {
  return new Promise((resolve) => {
    rl.question('Enter choice (1-10): ', (choice) => {
      resolve(choice.trim());
    });
  });
}

// Get two numbers for operations like add, subtract etc
const getTwoNumbers = () => {
  return new Promise((resolve) => {
    rl.question('Enter first number (or type "last" to use previous result): ', (num1) => {
      rl.question('Enter second number: ', (num2) => {
        resolve({ num1: num1.trim(), num2: num2.trim() });
      });
    });
  });
}

// Get one number for operations like square root
const getSingleNumber = () => {
  return new Promise((resolve) => {
      rl.question('Enter number (or "last" to use previous result): ', (num) => {
          resolve(num.trim());
      });
  });
}

// Check if the input is valid and convert to number
const validateAndParseNumber = (input) => {
  // Empty input check
  if (!input || input === '') {
    return { valid: false, error: 'Input cannot be empty' };
  }

  // Check if user wants to use last result
  if (input.toLowerCase() === 'last') {
    if (lastResult === null) {
      return { valid: false, error: 'No previous result available' };
    }
    return { valid: true, number: lastResult };
  }

  // Try to convert to number
  const parsed = parseFloat(input);

  // Check if conversion worked
  if (isNaN(parsed)) {
    return { valid: false, error: 'Invalid number format' };
  }

  return { valid: true, number: parsed };
}

// Validate both numbers for two-number operations
const validateNumbers = (num1, num2) => {
  const validation1 = validateAndParseNumber(num1);
  if (!validation1.valid) {
    return { valid: false, error: `First number: ${validation1.error}` };
  }

  const validation2 = validateAndParseNumber(num2);
  if (!validation2.valid) {
    return { valid: false, error: `Second number: ${validation2.error}` };
  }

  return {
    valid: true,
    numbers: {
      a: validation1.number,
      b: validation2.number
    }
  };
}

// Show error messages to user
const handleInvalidInput = (message) => {
  console.log(`\n❌ Error: ${message}`);
  console.log('Please try again.\n');
}

// Save calculation to history array
const addToHistory = (operation, result) => {
  const timestamp = new Date().toLocaleTimeString();
  calculationHistory.push({ operation, result, timestamp });
  lastResult = result;
}

// Display all saved calculations
const showHistory = () => {
  if (calculationHistory.length === 0) {
    console.log('\n No calculations in history');
    return;
  }

  console.log('\n Calculation History:');
  console.log('========================');
  calculationHistory.forEach((calc, index) => {
    console.log(`${index + 1}. ${calc.operation} = ${calc.result} (${calc.timestamp})`);
  });
  console.log('========================');
}

// Clear all saved calculations
const clearHistory = () => {
  calculationHistory = [];
  lastResult = null;
  console.log('\n History cleared successfully');
}

// Do the actual calculation and display result
const performCalculation = (operation, a, b, operationName) => {
  try {
    let result;
    let operationString;

    // For operations with two numbers
    if (b !== undefined) {
      result = operation(a, b);
      operationString = `${a} ${operationName} ${b}`;
    } else {
      // For operations with one number
      result = operation(a);
      operationString = `${operationName}(${a})`;
    }

    console.log(`\n✅ Result: ${operationString} = ${result}`);
    addToHistory(operationString, result);
    return result;

  } catch (error) {
    throw new Error(error.message);
  }
}

// Clean exit when user wants to quit
const handleExit = () => {
  console.log('\n👋 Thank you for using the calculator!');
  console.log('Goodbye!');

  rl.close();
  process.exit(0);
}

// Main program loop
async function mainMenuLoop() {
  showWelcomeMessage();

  while (true) {
    try {
      showAvailableOperations();

      // Show last result if available
      if (lastResult !== null) {
        console.log(`\n Last result: ${lastResult}`);
      }

      const choice = await promptOperationChoice();

      // Exit option
      if (choice === '10') {
        handleExit();
        break;
      }

      // History options
      if (choice === '8') {
        showHistory();
        continue;
      }

      if (choice === '9') {
        clearHistory();
        continue;
      }

      // Operations that need two numbers
      if (['1', '2', '3', '4', '5', '7'].includes(choice)) {
        const { num1, num2 } = await getTwoNumbers();
        const validation = validateNumbers(num1, num2);

        if (!validation.valid) {
          handleInvalidInput(validation.error);
          continue;
        }

        const { a, b } = validation.numbers;

        // Execute the chosen operation
        switch (choice) {
          case '1':
            performCalculation(add, a, b, '+');
            break;
          case '2':
            performCalculation(subtract, a, b, '-');
            break;
          case '3':
            performCalculation(multiply, a, b, '*');
            break;
          case '4':
            performCalculation(divide, a, b, '/');
            break;
          case '5':
            performCalculation(power, a, b, '^');
            break;
          case '7':
            performCalculation(percentage, a, b, '% of');
            break;
        }
      }
      // Square root only needs one number
      else if (choice === '6') {
        const numInput = await getSingleNumber();
        const validation = validateAndParseNumber(numInput);

        if (!validation.valid) {
          handleInvalidInput(validation.error);
          continue;
        }

        performCalculation(sqrt, validation.number, undefined, '√');
      }
      // Handle wrong menu choice
      else {
        handleInvalidInput('Invalid choice. Please select 1-10.');
        continue;
      }

    } catch (error) {
      handleInvalidInput(`Unexpected error: ${error.message}`);
    }
  }
}

// Oya, let start the calculator
mainMenuLoop();