/* @flow */

const chalk = require('chalk');

/* eslint-disable no-console */
module.exports = {
  log(...message: Array<mixed>) {
    console.log(chalk.green('emdaer:'), ...message);
  },
  warn(...message: Array<mixed>) {
    console.warn(chalk.yellow('emdaer:'), ...message);
  },
  error(...message: Array<mixed>) {
    console.error(chalk.red('emdaer:'), ...message);
  },
};
/* eslint-enable no-console */
