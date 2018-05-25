/* @flow */

const valueFromPackage = require('@emdaer/plugin-value-from-package');

/**
 * Creates a markdown link with the package name and license.
 * Pulls package name and license from package.json and links to ./LICENSE
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-license-reference'
 * -->
 * @returns {Promise<string>} The license reference
 */
async function licenseReferencePlugin(): Promise<string> {
  return `${await valueFromPackage({
    value: 'name',
  })} is [${await valueFromPackage({
    value: 'license',
  })} licensed](./LICENSE).`;
}

module.exports = licenseReferencePlugin;
