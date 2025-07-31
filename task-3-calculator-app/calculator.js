import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Store calculation history
let calculationHistory = [];
let lastResult = null;


/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
}

/**
* Subtract second number from first number
* @param {number} a - First number
* @param {number} b - Second number
* @returns {number} Difference of a and b
*/
const subtract = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a - b;
}

/**
* Multiply two numbers
* @param {number} a - First number
* @param {number} b - Second number
* @returns {number} Product of a and b
*/
const multiply = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a * b;
}

/**
* Divide first number by second number
* @param {number} a - Dividend
* @param {number} b - Divisor
* @returns {number} Quotient of a divided by b
* @throws {Error} When dividing by zero
*/
const divide = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}


// Welcome message
const showWelcomeMessage = () => {
  console.log("Welcome to Node.js Calculator!");
}

// Available operations
const showAvailableOperations = () => {
  console.log("\nSelect an operation:");
  console.log("1. Add");
  console.log("2. Subtract");
  console.log("3. Multiply");
  console.log("4. Divide");
  console.log("5. Show History");
  console.log("6. Clear History");
  console.log("7. Exit");
}

/**
 * Prompt user for operation choice
 * @returns {Promise<string>} User's choice
 */
const promptOperationChoice = () => {
  return new Promise((resolve) => {
    rl.question('Enter choice (1-7): ', (choice) => {
      resolve(choice.trim());
    });
  });
}

/**
* Get two numbers from user input
* @returns {Promise<Object>} Object containing num1 and num2
*/
const getTwoNumbers = () => {
  return new Promise((resolve) => {
    rl.question('Enter first number (or type "last" to use previous result): ', (num1) => {
      rl.question('Enter second number: ', (num2) => {
        resolve({ num1: num1.trim(), num2: num2.trim() });
      });
    });
  });
}

/**
 * Validate and parse number input
 * @param {string} input - Raw input string
 * @returns {Object} Validation result with parsed number or error
 */
const validateAndParseNumber = (input) => {
  // Handle empty input
  if (!input || input === '') {
    return { valid: false, error: 'Input cannot be empty' };
  }

  // Handle "last" keyword
  if (input.toLowerCase() === 'last') {
    if (lastResult === null) {
      return { valid: false, error: 'No previous result available' };
    }
    return { valid: true, number: lastResult };
  }

  // Parse the number
  const parsed = parseFloat(input);

  // Check if it's a valid number
  if (isNaN(parsed)) {
    return { valid: false, error: 'Invalid number format' };
  }

  return { valid: true, number: parsed };
}

/**
 * Validate two numbers from user input
 * @param {string} num1 - First number input
 * @param {string} num2 - Second number input
 * @returns {Object} Validation result
 */
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


/**
 * Handle invalid input by displaying error message
 * @param {string} message - Error message to display
 */
const handleInvalidInput = (message) => {
  console.log(`\n❌ Error: ${message}`);
  console.log('Please try again.\n');
}

/**
* Add calculation to history
* @param {string} operation - The operation performed
* @param {number} result - The result of the operation
*/
const addToHistory = (operation, result) => {
  const timestamp = new Date().toLocaleTimeString();
  calculationHistory.push({ operation, result, timestamp });
  lastResult = result;
}

/**
* Display calculation history
*/
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

/**
* Clear calculation history
*/
const clearHistory = () => {
  calculationHistory = [];
  lastResult = null;
  console.log('\n History cleared successfully');
}

/**
 * Perform calculation and handle result
 * @param {Function} operation - The mathematical operation function
 * @param {number} a - First operand
 * @param {number} b - Second operand (optional for single operand operations)
 * @param {string} operationName - Name of the operation for display
 * @returns {number} Result of the calculation
 */
const performCalculation = (operation, a, b, operationName) => {
  try {
    let result;
    let operationString;

    if (b !== undefined) {
      result = operation(a, b);
      operationString = `${a} ${operationName} ${b}`;
    } else {
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

/**
* Handle graceful exit
*/
const handleExit = () => {
  console.log('\n👋 Thank you for using the calculator!');
  console.log('Goodbye!');

  // Close readline interface
  rl.close();

  // Exit the process
  process.exit(0);
}


/**
 * Main menu loop - handles user interaction
 */
async function mainMenuLoop() {
  showWelcomeMessage();

  while (true) {
    try {
      showAvailableOperations();

      if (lastResult !== null) {
        console.log(`\n Last result: ${lastResult}`);
      }

      const choice = await promptOperationChoice();

      // Handle exit
      if (choice === '7') {
        handleExit();
        break;
      }

      // Handle history operations
      if (choice === '5') {
        showHistory();
        continue;
      }

      if (choice === '6') {
        clearHistory();
        continue;
      }

      // Handle mathematical operations
      if (['1', '2', '3', '4'].includes(choice)) {
        const { num1, num2 } = await getTwoNumbers();
        const validation = validateNumbers(num1, num2);

        if (!validation.valid) {
          handleInvalidInput(validation.error);
          continue;
        }

        const { a, b } = validation.numbers;

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
        }
      }
      // Handle invalid choice
      else {
        handleInvalidInput('Invalid choice. Please select 1-7.');
        continue;
      }

    } catch (error) {
      handleInvalidInput(`Unexpected error: ${error.message}`);
    }
  }
}

// Oya, let start the calculator
mainMenuLoop();