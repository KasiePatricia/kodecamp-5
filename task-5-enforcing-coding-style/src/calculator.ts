import readline from 'readline';

// Type definitions
interface CalculationHistory {
  operation: string;
  result: number;
  timestamp: string;
}

interface ValidationResult {
  valid: boolean;
  number?: number;
  error?: string;
}

interface NumbersValidationResult {
  valid: boolean;
  numbers?: {
    a: number;
    b: number;
  };
  error?: string;
}

enum OperationChoice {
  ADD = '1',
  SUBTRACT = '2',
  MULTIPLY = '3',
  DIVIDE = '4',
  POWER = '5',
  SQUARE_ROOT = '6',
  PERCENTAGE = '7',
  SHOW_HISTORY = '8',
  CLEAR_HISTORY = '9',
  EXIT = '10',
}

const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Store calculation history
let calculationHistory: CalculationHistory[] = [];
let lastResult: number | null = null;

// Basic math functions

/**
 * Performs addition of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
const add = (a: number, b: number): number => a + b;

/**
 * Performs subtraction of two numbers.
 * @param a - The minuend.
 * @param b - The subtrahend.
 * @returns The difference of a and b.
 */
const subtract = (a: number, b: number): number => a - b;

/**
 * Performs multiplication of two numbers.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The product of a and b.
 */
const multiply = (a: number, b: number): number => a * b;

/**
 * Performs division of two numbers with a zero check.
 * @param a - The dividend.
 * @param b - The divisor.
 * @returns The quotient of a divided by b.
 * @throws An error if division by zero is attempted.
 */
const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
};

/**
 * Calculates the power of a base to an exponent.
 * @param base - The base number.
 * @param exponent - The exponent.
 * @returns The result of base raised to the exponent.
 */
const power = (base: number, exponent: number): number =>
  Math.pow(base, exponent);

/**
 * Calculates the square root of a number, with a negative number check.
 * @param value - The number to find the square root of.
 * @returns The square root of the value.
 * @throws An error if a negative number is provided.
 */
const sqrt = (value: number): number => {
  if (value < 0) {
    throw new Error('Cannot find square root of a negative number');
  }
  return Math.sqrt(value);
};

/**
 * Calculates a percentage of a number.
 * @param value - The value to calculate the percentage of.
 * @param percentageValue - The percentage to apply.
 * @returns The calculated percentage value.
 */
const percentage = (value: number, percentage: number): number =>
  (value * percentage) / 100;

// Display functions

const displayWelcomeMessage = (): void => {
  console.log('Welcome to Node.js Calculator!');
};

const showAvailableOperations = (): void => {
  console.log('\nSelect an operation:');
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
};

//
// User Input Functions
//

const promptForOperation = (): Promise<string> => {
  return new Promise(resolve => {
    rl.question('Enter choice (1-10): ', (choice: string) => {
      resolve(choice.trim());
    });
  });
};

const getTwoNumbers = (): Promise<{ num1: string; num2: string }> => {
  return new Promise(resolve => {
    rl.question(
      'Enter first number (or type "last" to use previous result): ',
      (num1: string) => {
        rl.question('Enter second number: ', (num2: string) => {
          resolve({ num1: num1.trim(), num2: num2.trim() });
        });
      },
    );
  });
};

const getSingleNumber = (): Promise<string> => {
  return new Promise(resolve => {
    rl.question(
      'Enter number (or "last" to use previous result): ',
      (num: string) => {
        resolve(num.trim());
      },
    );
  });
};

//
// Input Validation Functions
//

/**
 * Validates and parses a single number input string.
 * @param input - The string to validate and parse.
 * @returns A ValidationResult object indicating if the input is valid and the parsed number.
 */
const validateAndParseNumber = (input: string): ValidationResult => {
  if (!input || input === '') {
    return { valid: false, error: 'Input cannot be empty' };
  }
  if (input.toLowerCase() === 'last') {
    if (lastResult === null) {
      return { valid: false, error: 'No previous result available' };
    }
    return { valid: true, number: lastResult };
  }
  const parsed: number = parseFloat(input);
  if (isNaN(parsed)) {
    return { valid: false, error: 'Invalid number format' };
  }
  return { valid: true, number: parsed };
};

/**
 * Validates and parses two number input strings.
 * @param num1 - The first number string.
 * @param num2 - The second number string.
 * @returns A NumbersValidationResult object with the parsed numbers or an error.
 */
const validateNumbers = (
  num1: string,
  num2: string,
): NumbersValidationResult => {
  const validation1: ValidationResult = validateAndParseNumber(num1);
  if (!validation1.valid) {
    return { valid: false, error: `First number: ${validation1.error}` };
  }
  const validation2: ValidationResult = validateAndParseNumber(num2);
  if (!validation2.valid) {
    return { valid: false, error: `Second number: ${validation2.error}` };
  }
  return {
    valid: true,
    numbers: {
      a: validation1.number!,
      b: validation2.number!,
    },
  };
};

//
// Error and History Handlers
//

const handleInvalidInput = (message: string): void => {
  console.log(`\n❌ Error: ${message}`);
  console.log('Please try again.\n');
};

const handleCalculationError = (error: Error): void => {
  console.log(`\n❌ Calculation Error: ${error.message}`);
  console.log('Please try again.\n');
};

const addToHistory = (operation: string, result: number): void => {
  const timestamp: string = new Date().toLocaleTimeString();
  calculationHistory.push({ operation, result, timestamp });
  lastResult = result;
};

const showHistory = (): void => {
  if (calculationHistory.length === 0) {
    console.log('\n No calculations in history');
    return;
  }
  console.log('\n Calculation History:');
  console.log('========================');
  calculationHistory.forEach((calc: CalculationHistory, index: number) => {
    console.log(
      `${index + 1}. ${calc.operation} = ${calc.result} (${calc.timestamp})`,
    );
  });
  console.log('========================');
};

const clearHistory = (): void => {
  calculationHistory = [];
  lastResult = null;
  console.log('\n History cleared successfully');
};

//
// Calculation Logic Functions
//

/**
 * Executes a calculation with two numbers and logs the result.
 * @param operation - The function to perform the calculation.
 * @param a - The first number.
 * @param b - The second number.
 * @param operationName - The string representation of the operation for display.
 * @returns The result of the calculation.
 */
const performTwoNumberCalculation = (
  operation: (a: number, b: number) => number,
  a: number,
  b: number,
  operationName: string,
): number => {
  try {
    const result = operation(a, b);
    const operationString = `${a} ${operationName} ${b}`;
    console.log(`\n✅ Result: ${operationString} = ${result}`);
    addToHistory(operationString, result);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

/**
 * Executes a calculation with a single number and logs the result.
 * @param operation - The function to perform the calculation.
 * @param a - The number to operate on.
 * @param operationName - The string representation of the operation for display.
 * @returns The result of the calculation.
 */
const performSingleNumberCalculation = (
  operation: (a: number) => number,
  a: number,
  operationName: string,
): number => {
  try {
    const result = operation(a);
    const operationString = `${operationName}(${a})`;
    console.log(`\n✅ Result: ${operationString} = ${result}`);
    addToHistory(operationString, result);
    return result;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const exitGracefully = (): void => {
  console.log('\n👋 Thank you for using the calculator!');
  console.log('Goodbye!');
  rl.close();
  process.exit(0);
};

//
// Main Program Loop
//
async function mainMenuLoop(): Promise<void> {
  displayWelcomeMessage();

  while (true) {
    try {
      showAvailableOperations();
      if (lastResult !== null) {
        console.log(`\n Last result: ${lastResult}`);
      }

      const choice: string = await promptForOperation();

      if (choice === OperationChoice.EXIT) {
        exitGracefully();
        break;
      }

      if (choice === OperationChoice.SHOW_HISTORY) {
        showHistory();
        continue;
      }

      if (choice === OperationChoice.CLEAR_HISTORY) {
        clearHistory();
        continue;
      }

      const twoNumberOperations = [
        OperationChoice.ADD,
        OperationChoice.SUBTRACT,
        OperationChoice.MULTIPLY,
        OperationChoice.DIVIDE,
        OperationChoice.POWER,
        OperationChoice.PERCENTAGE,
      ];

      if (twoNumberOperations.includes(choice as OperationChoice)) {
        const { num1, num2 }: { num1: string; num2: string } =
          await getTwoNumbers();
        const validation: NumbersValidationResult = validateNumbers(num1, num2);

        if (!validation.valid) {
          handleInvalidInput(validation.error!);
          continue;
        }

        const { a, b }: { a: number; b: number } = validation.numbers!;

        switch (choice) {
          case OperationChoice.ADD:
            performTwoNumberCalculation(add, a, b, '+');
            break;
          case OperationChoice.SUBTRACT:
            performTwoNumberCalculation(subtract, a, b, '-');
            break;
          case OperationChoice.MULTIPLY:
            performTwoNumberCalculation(multiply, a, b, '*');
            break;
          case OperationChoice.DIVIDE:
            performTwoNumberCalculation(divide, a, b, '/');
            break;
          case OperationChoice.POWER:
            performTwoNumberCalculation(power, a, b, '^');
            break;
          case OperationChoice.PERCENTAGE:
            performTwoNumberCalculation(percentage, a, b, '% of');
            break;
        }
      } else if (choice === OperationChoice.SQUARE_ROOT) {
        const numInput: string = await getSingleNumber();
        const validation: ValidationResult = validateAndParseNumber(numInput);

        if (!validation.valid) {
          handleInvalidInput(validation.error!);
          continue;
        }
        performSingleNumberCalculation(sqrt, validation.number!, '√');
      } else {
        handleInvalidInput('Invalid choice. Please select 1-10.');
        continue;
      }
    } catch (error) {
      handleCalculationError(error as Error);
    }
  }
}

process.on('SIGINT', (): void => {
  console.log('\n\n⚠️  Process interrupted by user');
  exitGracefully();
});

process.on('uncaughtException', (error: Error): void => {
  console.error('\n💥 Uncaught Exception:', error.message);
  exitGracefully();
});

mainMenuLoop().catch((error: Error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
