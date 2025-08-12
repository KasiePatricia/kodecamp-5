# Node.js TypeScript Calculator App

A comprehensive command-line calculator application built with Node.js and TypeScript that performs basic and advanced arithmetic operations with interactive user input handling and type safety.

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
- **Type Safety**: Full TypeScript implementation with strict typing
- **Calculation History**: View all previous calculations with timestamps
- **Previous Result Usage**: Use "last" keyword to reference the previous calculation result
- **Input Validation**: Robust validation for all user inputs with type checking
- **Error Handling**: Comprehensive error handling with clear error messages
- **Graceful Exit**: Clean shutdown with Ctrl+C support

## Prerequisites

- Node.js version 14.0.0 or higher
- npm or yarn package manager
- Basic understanding of command line/terminal

## Installation

1. **Clone or create project directory:**
   ```bash
   mkdir calculator-app
   cd calculator-app
   ```

2. **Install dependencies:**
   ```bash
   npm install --save-dev typescript @types/node ts-node
   ```

3. **Copy the project files:**
   - Copy `tsconfig.json` to project root
   - Create `src/` directory and copy `calculator.ts` inside it
   - Update `package.json` with the provided content

## Usage

### Development Mode (TypeScript)

Run directly with ts-node for development:
```bash
npm run dev
```

### Production Mode (Compiled JavaScript)

Build and run the compiled version:
```bash
# Build TypeScript to JavaScript
npm run build

# Run the compiled version
npm start
```

### Clean Build Files

Remove compiled files:
```bash
npm run clean
```

### Example Interaction

```
Welcome to Node.js Calculator!

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

 Last result: 25

Enter choice (1-10): 1
Enter first number (or type "last" to use previous result): last
Enter second number: 10

✅ Result: 25 + 10 = 35
```

## TypeScript Features

### Type Definitions

The application includes comprehensive type definitions:

```typescript
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

enum OperationChoice {
  ADD = '1',
  SUBTRACT = '2',
  // ... other operations
}
```

### Type Safety

All functions have proper type annotations:

```typescript
const add = (a: number, b: number): number => {
  // Implementation with type safety
}

const validateAndParseNumber = (input: string): ValidationResult => {
  // Type-safe validation
}
```

### Error Handling

Type-safe error handling throughout the application:

```typescript
const handleCalculationError = (error: Error): void => {
  console.log(`❌ Calculation Error: ${error.message}`);
}
```

## Project Structure

```
calculator-app/
├── src/
│   └── calculator.ts      # Main TypeScript application file
├── dist/                  # Compiled JavaScript output (after build)
│   └── calculator.js      # Compiled main file
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project configuration
└── README.md             # This file
```

## TypeScript Configuration

The project uses strict TypeScript settings in `tsconfig.json`:

- Strict type checking enabled
- ES2020 target for modern JavaScript features
- Source maps for debugging
- Declaration files generation

## Input Validation

The calculator includes comprehensive input validation with TypeScript types:

- **Type Guards**: Functions that check input types at runtime
- **Interface Validation**: Structured validation results
- **Null Safety**: Proper handling of null/undefined values
- **Type Assertions**: Safe type conversions with proper checking

## Error Handling

- Typed try-catch blocks for all operations
- Custom error interfaces and types
- Graceful handling of unexpected errors
- Clear, user-friendly error messages with type safety
- Automatic retry on invalid input

## Testing Scenarios

Test your calculator with these scenarios:

### Normal Operations
- Positive numbers: `5 + 3 = 8`
- Negative numbers: `-5 + 3 = -2`
- Decimals: `2.5 * 4 = 10`

### Edge Cases
- Division by zero: `10 / 0` → Type-safe error message
- Square root of negative: `√-4` → Type-safe error message
- Very large numbers: `999999 * 999999`

### Invalid Inputs
- Letters: `abc + 5` → Type-safe validation error
- Special characters: `@#$ * 2` → Type-safe validation error
- Empty inputs: `` → Type-safe validation error

### Advanced Features
- Using previous result: `last + 5`
- Viewing history: Choose option 8
- Clearing history: Choose option 9

## Development

### Building

The TypeScript compiler will:
1. Type-check your code
2. Compile TypeScript to JavaScript
3. Generate source maps for debugging
4. Create declaration files

### Type Checking

Run type checking without compilation:
```bash
npx tsc --noEmit
```

### Debugging

Source maps are generated, so you can debug the TypeScript source directly.

## Dependencies

### Runtime Dependencies
- Node.js built-in modules only (`readline`)

### Development Dependencies
- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions
- `ts-node`: Direct TypeScript execution

## Benefits of TypeScript Version

1. **Type Safety**: Catches errors at compile time
2. **Better IDE Support**: Enhanced autocomplete and IntelliSense
3. **Documentation**: Types serve as inline documentation
4. **Refactoring**: Safer code refactoring with type checking
5. **Modern Features**: Access to latest JavaScript features with backward compatibility

## Troubleshooting

### Common TypeScript Issues

1. **Compilation Errors**
   - Check `tsconfig.json` configuration
   - Ensure all types are properly defined
   - Run `tsc --noEmit` to see type errors

2. **Runtime vs Compile Time**
   - TypeScript only checks types at compile time
   - Runtime validation still needed for user input

3. **Module Resolution**
   - Ensure correct import/export statements
   - Check Node.js compatibility settings

### Getting Help

If you encounter issues:
1. Check TypeScript compiler error messages
2. Verify all type definitions are correct
3. Ensure dependencies are properly installed
4. Test with both development and production builds

## License

MIT License - feel free to use this code for educational purposes.