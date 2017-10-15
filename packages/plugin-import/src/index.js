/* @flow */

const fs = require('fs-extra');

/**
 * A plugin to import files
 *
 * @param                     options
 * @param   {string}          [options.path] The path to the file to import
 * @returns {Promise<string>}                The contents of the imported file
 */
module.exports = async function importPlugin({
  path,
}: {
  path: string,
}): Promise<string> {
  return (await fs.readFile(path)).toString();
};
