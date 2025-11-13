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
      'react/react-in-jsx-scope': 'off', // Не требуется в React 17+
      
      // Отступы 2 пробела
      "indent": ["error", 2],
      
      // Точки с запятой - без них (как в исходном конфиге)
      'semi': ['error', 'never'],
      
      // Правильный порядок импортов
      'import/order': ['error', {
        'groups': [
          'builtin',    // Встроенные модули
          'external',   // Внешние зависимости
          'internal',   // Внутренние модули
          ['parent', 'sibling'], // Родительские и соседние директории
          'index',      // index файлы
          'object',     // Object imports
          'type'        // Type imports
        ],
        'pathGroups': [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
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
        max: 1,        // максимум 1 пустая строка подряд
        maxEOF: 0,     // не допускать пустых строк в конце файла
        maxBOF: 0      // не допускать пустых строк в начале файла
      }],
      
      'padded-blocks': ['error', 'never'], // запрет пустых строк в начале/конце блоков
      
      'lines-between-class-members': ['error', 'always', {
        exceptAfterSingleLine: true // разрешить без пустой строки после однострочных членов класса
      }],
      
      'padding-line-between-statements': [
        'error',
        // Пустая строка перед return
        { blankLine: 'always', prev: '*', next: 'return' },
        // Пустая строка перед блоками
        { blankLine: 'always', prev: '*', next: ['block', 'block-like'] },
        // Пустая строка между объявлениями переменных и следующим кодом
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        // Пустая строка между импортами и следующим кодом
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        // Пустая строка между экспортами и следующим кодом
        { blankLine: 'always', prev: 'export', next: '*' },
        { blankLine: 'any', prev: 'export', next: 'export' },
        // Пустая строка между функциями
        { blankLine: 'always', prev: 'function', next: 'function' },
        // Пустая строка между классами
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