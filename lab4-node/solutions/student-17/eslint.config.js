import js from '@eslint/js';
import globals from 'globals';

export default [
  { 
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'indent': ['error', 2],
      'linebreak-style': ['error', 'windows'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      'comma-dangle': ['error', 'never'],
      'arrow-spacing': 'error',
      'object-curly-spacing': ['error', 'always']
    }
  }
];