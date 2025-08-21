# TypeScript Calculator with CI/CD

A command-line calculator application built with Node.js and TypeScript, featuring automated code quality checks, formatting, and CI/CD pipeline.

## Features

- Basic arithmetic operations (add, subtract, multiply, divide)
- Advanced operations (power, square root, percentage)
- Calculation history with timestamps
- Previous result memory ("last" keyword)
- Error handling for edge cases
- Automated code quality checks with ESLint
- Code formatting with Prettier
- Pre-commit hooks with Husky
- Continuous Integration with GitHub Actions

## Prerequisites

- Node.js (>=14.0.0)
- npm
- Git repository (GitHub)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd typescript-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Available Operations
1. Add - Performs addition of two numbers
2. Subtract - Performs subtraction of two numbers
3. Multiply - Performs multiplication of two numbers
4. Divide - Performs division with zero-check protection
5. Power - Calculates base raised to exponent
6. Square Root - Calculates square root with negative number protection
7. Percentage - Calculates percentage of a number
8. Show History - Displays calculation history
9. Clear History - Clears all calculation history
10. Exit - Closes the calculator

### Special Features
- Use "last" as input to reference the previous calculation result
- Automatic history tracking with timestamps
- Graceful error handling and user-friendly messages

## Development Setup

### Step 1: ESLint Setup

1. Initialize ESLint:
```bash
npm init @eslint/config@latest
```

2. Install ESLint and TypeScript parser:
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

3. Create `.eslintrc.json`:
```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

4. Create `.eslintignore`:
```
node_modules/
dist/
*.js
```

5. Add ESLint scripts to `package.json`:
```json
{
  "scripts": {
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  }
}
```

### Step 2: Prettier Setup

1. Install Prettier:
```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

2. Create `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

3. Create `.prettierignore`:
```
node_modules/
dist/
*.js
package-lock.json
*.md
```

4. Update `.eslintrc.json` to include Prettier:
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

5. Add Prettier scripts to `package.json`:
```json
{
  "scripts": {
    "format": "prettier --write src/**/*.ts",
    "format:check": "prettier --check src/**/*.ts"
  }
}
```

### Step 3: Husky Setup

1. Install Husky:
```bash
npm install --save-dev husky lint-staged
```

2. Initialize Husky:
```bash
npx husky init
```

3. Create `.husky/pre-commit`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

4. Make it executable:
```bash
chmod +x .husky/pre-commit
```

5. Install Husky and lint-staged for pre-commit hooks
```bash
npm install --save-dev husky lint-staged
```

6. Add lint-staged configuration to `package.json`:
```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

7. Add Husky script to `package.json`:
```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### Step 4: GitHub Actions CI/CD

Create `.github/workflows/ci.yml`:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run ESLint
      run: npm run lint
    
    - name: Check Prettier formatting
      run: npm run format:check
    
    - name: Build project
      run: npm run build
    
    - name: Run tests (when available)
      run: npm test || true

  security-scan:
    runs-on: ubuntu-latest
    needs: code-quality
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Run security audit
      run: npm audit --audit-level=moderate
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled calculator |
| `npm run dev` | Run in development mode with ts-node |
| `npm run clean` | Remove compiled files |
| `npm run lint` | Run ESLint on TypeScript files |
| `npm run lint:fix` | Run ESLint and automatically fix issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check if code is formatted correctly |

## Project Structure

```
typescript-calculator/
├── src/
│   └── calculator.ts          # Main calculator application
├── dist/                      # Compiled JavaScript files
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions workflow
├── .husky/
│   └── pre-commit            # Pre-commit hook
├── .eslintrc.json            # ESLint configuration
├── .eslintignore             # ESLint ignore rules
├── .prettierrc               # Prettier configuration
├── .prettierignore           # Prettier ignore rules
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## Code Quality Standards

This project enforces the following code quality standards:

- **ESLint**: Static code analysis for identifying problematic patterns
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety and modern JavaScript features
- **Pre-commit hooks**: Automatic linting and formatting before commits
- **CI/CD**: Automated testing and quality checks on every push/PR

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes (code will be automatically linted and formatted on commit)
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Error Handling

The calculator includes comprehensive error handling for:
- Division by zero
- Square root of negative numbers
- Invalid number formats
- Empty inputs
- Missing previous results

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Ugwu Kasie

## Version History

- **1.0.0** - Initial release with basic calculator functionality
- **1.1.0** - Added code quality tools (ESLint, Prettier, Husky, GitHub Actions)