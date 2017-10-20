/* @flow */

const valueFromPackage = require('@emdaer/plugin-value-from-package');

/**
 * A plugin to generate a license reference
 *
 * Pulls package name and license from package.json and links to ./LICENSE
 *
 * @returns {Promise<string>} The license reference
 */
module.exports = async function licenseReferencePlugin(): Promise<string> {
  return `${await valueFromPackage({
    value: 'name',
  })} is [${await valueFromPackage({
    value: 'license',
  })} licensed](./LICENSE).`;
};
