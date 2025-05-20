module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['./tests/setup.js', './tests/jest.setup.js'],
  testTimeout: 30000,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'json'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
}; 