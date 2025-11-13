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
    '^@my-app/ui-library$': '<rootDir>/../ui-library/src',
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
    'src/main.tsx',
    'src/setupTests.ts',
    'src/.*\\.d\\.ts$'
  ],
  
  // Collect coverage information
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/setupTests.ts'
  ],
  
  coverageDirectory: 'coverage',
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$'
  ],
}

export default config