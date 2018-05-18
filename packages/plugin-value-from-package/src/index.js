/* @flow */

const fs = require('fs-extra');

/**
 * Retrieve and render values from package.json
 *
 * @example
 * <!--emdaer-p
 *  - '@emdaer/plugin-value-from-package'
 *   - value: name
 * -->
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
  const packagePath = `${path || ''}package.json`;
  const packageValue = JSON.parse(await fs.readFile(packagePath, 'utf8'))[
    value
  ];
  if (typeof packageValue === 'undefined') {
    throw new Error(`No value "${value}" found in ${packagePath}`);
  }
  return packageValue;
}

module.exports = valueFromPackage;
