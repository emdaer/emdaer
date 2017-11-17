/* @flow */

const { sep, resolve } = require('path');
const emdaer = require('@emdaer/core');

/**
 * Use the export of a given package as the content if it's a string,
 * and execute it with provided args if it's a function
 *
 * @param options
 * @param {string} [options.path] The filename to require.
 * @param {array} [options.args] An array of args to pass to the exported function at the required path.
 * @param {boolean} [options.runEmdaer] Whether or not to run emdaer on the content.
 * @returns {Promise<string>} The contents at the path or the execution results
 */
async function nodePackagePlugin({
  path,
  args,
  runEmdaer,
}: {
  path: string,
  args: Array<*>,
  runEmdaer: boolean,
}): Promise<string> {
  let required;
  let content;
  try {
    let modulePath;
    if (path.startsWith(sep)) {
      modulePath = path;
    } else if (path.startsWith(`.${sep}`) || path.startsWith(`..${sep}`)) {
      modulePath = resolve(process.cwd(), path);
    } else {
      modulePath = path;
    }
    required = require(modulePath);
  } catch (e) {
    throw new Error(`Unable to require provided path: ${e.message}`);
  }
  if (typeof required === 'string') {
    content = required;
  } else if (typeof required === 'function') {
    if (args) {
      content = required(...args);
    } else {
      content = required();
    }
  } else {
    throw new Error(`Exported value must either be a string or a function`);
  }

  return runEmdaer ? emdaer(path, content, false) : content;
}

module.exports = nodePackagePlugin;
