/* @flow */

const emdaer = require('@emdaer/core');
const fs = require('fs-extra');

/**
 * Import and optionally render files.
 *
 * @param options
 * @param {string} [options.path] The filename or file descriptor.
 * @param {boolean} [options.runEmdaer] Whether or not to run emdaer on the imported file.
 * @returns {Promise<string>} The contents of the imported file
 */
async function importPlugin({
  path,
  runEmdaer,
}: {
  path: string,
  runEmdaer: boolean,
}): Promise<string> {
  const content = (await fs.readFile(path)).toString();
  return runEmdaer ? emdaer(path, content, false) : content;
}

module.exports = importPlugin;
