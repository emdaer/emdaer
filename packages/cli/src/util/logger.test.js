global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const chalk = require('chalk');

const logger = require('./logger');

/* eslint-disable no-console */
describe('logger', () => {
  test('logs messages', async () => {
    logger.log('Hello');
    expect(console.log).toHaveBeenLastCalledWith(
      chalk.green('emdaer:'),
      'Hello'
    );
    logger.warn('World');
    expect(console.warn).toHaveBeenLastCalledWith(
      chalk.yellow('emdaer:'),
      'World'
    );
    logger.error('!');
    expect(console.error).toHaveBeenLastCalledWith(chalk.red('emdaer:'), '!');
  });
});
/* eslint-enable no-console */
