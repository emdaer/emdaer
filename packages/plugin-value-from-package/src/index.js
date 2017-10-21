/* @flow */

const fs = require('fs-extra');

/**
 * A plugin to add values from package.json
 *
 * @param                     options
 * @param   {string}          options.value The value to get from the package.json
 * @param   {string}          options.path  The path to the directory in which to find the package.json
 * @returns {Promise<string>}               The value from package.json
 */
async function valueFromPackage({
  value,
  path,
}: {
  value: string,
  path: ?string,
}): Promise<string> {
  return JSON.parse(await fs.readFile(`${path || ''}package.json`, 'utf8'))[
    value
  ];
}

module.exports = valueFromPackage;
