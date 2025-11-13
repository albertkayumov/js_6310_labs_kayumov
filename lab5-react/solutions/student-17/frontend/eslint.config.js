import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'node_modules']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin
    },
    rules: {
      // React Refresh для Vite
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // React правила
      'react/react-in-jsx-scope': 'off',
      
      // Отступы 2 пробела
      "indent": ["error", 2],
      
      // Точки с запятой - без них
      'semi': ['error', 'never'],
      
      // Правильный порядок импортов
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type'
        ],
        'pathGroups': [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@my-app/**',
            group: 'internal'
          },
          {
            pattern: '../**',
            group: 'parent'
          },
          {
            pattern: './**',
            group: 'sibling'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true
        }
      }],
      
      // Запрет лишних переносов
      'no-multiple-empty-lines': ['error', {
        max: 1,
        maxEOF: 0,
        maxBOF: 0
      }],
      
      'padded-blocks': ['error', 'never'],
      
      'lines-between-class-members': ['error', 'always', {
        exceptAfterSingleLine: true
      }],
      
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: ['block', 'block-like'] },
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: 'export', next: '*' },
        { blankLine: 'any', prev: 'export', next: 'export' },
        { blankLine: 'always', prev: 'function', next: 'function' },
        { blankLine: 'always', prev: 'class', next: 'class' }
      ],

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      
      // Запрет var (требование задания)
      'no-var': 'error',
      
      // Запрет require (требование задания)
      '@typescript-eslint/no-require-imports': 'error',
    },
  },
])