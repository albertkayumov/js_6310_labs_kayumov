import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  },
  {
    rules: {
      'indent': [
        'error',
        2,
        {
          'FunctionDeclaration': {
            'parameters': 'first'
          },
          'MemberExpression': 2
        }
      ],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': 'warn',
      'no-undef': 'error',
      'no-var': 'error',
      'comma-dangle': ['error', 'never'],
      'arrow-spacing': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'eol-last': 'error'
    }
  },
  {
    // Игнорируем папки, которые не должны проверяться
    ignores: [
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'build/**'
    ]
  }
]);