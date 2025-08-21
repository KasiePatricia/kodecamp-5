import js from '@eslint/js';
import globals from 'globals';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
    { ignores: ['dist', '.eslintrc.config.js'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            sourceType: 'module',
            parser: tsparser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: '18.2',
            },
            'import/resolver': {
                typescript: {},
            },
        },
        plugins: {
            // Remove the '@typescript-eslint' entry because it's already included via tseslint.configs.recommended.
            // 'react-hooks': reactHooks,
            // 'react-refresh': reactRefresh,
            prettier,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            // ...reactHooks.configs.recommended.rules,
            // 'react-refresh/only-export-components': [
            //     'warn',
            //     { allowConstantExport: true },
            // ],
            'prettier/prettier': [
                'error',
                {
                    arrowParens: 'avoid',
                    bracketSameLine: true,
                    bracketSpacing: true,
                    singleQuote: true,
                    trailingComma: 'all',
                    semi: true,
                    printWidth: 80,
                    tabWidth: 2,
                    endOfLine: 'auto',
                },
                {
                    usePrettierrc: true,
                },
            ],
        },
    },
);
