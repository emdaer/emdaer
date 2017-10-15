module.exports = {
  collectCoverage: true,
  testMatch: ['<rootDir>/**/*.test.js'],
  transform: {
    '\\.js$': 'jest-flow-transform',
  },
};
