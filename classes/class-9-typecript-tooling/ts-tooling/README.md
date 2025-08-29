eslint - npm init @eslint/config@latest
npx eslint src/index.js 

prettier - npm install --save-dev --save-exact prettier
        - node --eval "fs.writeFileSync('.prettierrc','{}\n')"
        - node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

Husky - npm install --save-dev husky
    - npx husky init
