module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.js'],
  transform: {
    '\\.js$': 'jest-flow-transform',
  },
};
