/* @flow */

const { resolve } = require('path');
const get = require('lodash.get');

/**
 * Gets a list of possible paths for the given file
 * This may be a relative path, check that first, then check in node modules.
 *
 * @param {string} path the node module or relative path to append to the possible directories.
 * @returns {Array<string>} list of possible paths for the given file
 */
module.exports = function getMarkdownPaths(filePath: string): Array<string> {
  const possibleDirectories = get(require, 'main.paths', []);
  return [process.cwd(), ...possibleDirectories].map(nodeModulesPath =>
    resolve(nodeModulesPath, filePath)
  );
};
