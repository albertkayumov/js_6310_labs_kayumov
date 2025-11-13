const config = {
  // Use jsdom to simulate a browser environment for React components
  testEnvironment: 'jsdom',
  
  // Configure ts-jest to transpile TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
  },
  
  // Module name mapping for CSS imports and path aliases
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@my-app/ui-library$': '<rootDir>/src',
  },
  
  // Specify file extensions Jest should look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Setup file for global configurations or mocks
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Test match patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  
  // Ignore patterns for test execution
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/'
  ],
  
  // Ignore patterns for coverage reporting
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    'src/index.ts',
    'src/setupTests.ts',
    'src/.*\\.d\\.ts$'
  ],
  
  // Collect coverage information
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/setupTests.ts',
    '!src/**/types.ts',
    '!src/**/__tests__/**',
    '!src/**/*.{test,spec}.{ts,tsx}'
  ],
  
  coverageDirectory: 'coverage',
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Reporters
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Reset modules between tests
  resetModules: true,
}

export default config