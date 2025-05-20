module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  setupFiles: ['../setup.js'],
  testTimeout: 30000,
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}; 