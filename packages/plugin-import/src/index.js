/* @flow */

const emdaer = require('@emdaer/core');
const fs = require('fs-extra');

/**
 * A plugin to import files
 *
 * @param                     options
 * @param   {string}          [options.path]      The path to the file to import
 * @param   {boolean}         [options.runEmdaer] Whether or not to run emdaer on the imported file.
 * @returns {Promise<string>}                     The contents of the imported file
 */
module.exports = async function importPlugin({
  path,
  runEmdaer,
}: {
  path: string,
  runEmdaer: boolean,
}): Promise<string> {
  const content = (await fs.readFile(path)).toString();
  return runEmdaer ? emdaer(path, content, false) : content;
};
