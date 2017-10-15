global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const chalk = require('chalk');

const logger = require('./_logger');

/* eslint-disable no-console */
describe('_logger', () => {
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
