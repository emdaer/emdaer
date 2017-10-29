module.exports = {
  collectCoverage: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.js'],
  transform: {
    '\\.js$': 'jest-flow-transform',
  },
};
