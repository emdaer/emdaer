/* @flow */

const { sep, resolve } = require('path');
const emdaer = require('@emdaer/core');
const fs = require('fs-extra');

const getMarkdownPaths = require('./util/getMarkdownPaths');

const COMMON_MARKDOWN_FILE_EXTS = [
  '.markdown',
  '.mdown',
  '.mkdn',
  '.md',
  '.mkd',
  '.mdwn',
  '.mdtxt',
  '.mdtext',
  '.text',
  '.txt',
  '.Rmd',
];

/**
 * Import content into your readme
 * Content can be imported in a few ways, as long as it's a string
 * - a local path to a markdown file, a partial of your readme. ex: .emdaer/README/USAGE.md.
 * - a path to a node module that contains markdown files in its pacakge. ex: moduleName/lib/file.md.
 * - a path to a node module exporting a string. ex: moduleName/lib/todo.js
 * - a path to a node module exporting a function that takes arguments and returns/resolves to a string ex: module
 *
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-import'
 *   - path: .emdaer/importExample.md
 *     runEmdaer: true
 * -->
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-import'
 *   - path: .emdaer/printThrice
 *     args:
 *       - Hello world! x3
 * -->
 * @param options
 * @param {string} [options.path] The filename to require.
 * @param {array} [options.args] An array of args to pass to the exported function at the required path.
 * @param {boolean} [options.runEmdaer] Whether or not to run emdaer on the content.
 * @returns {Promise<string>} The contents at the path or the execution results
 */
async function importPlugin({
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
    if (COMMON_MARKDOWN_FILE_EXTS.some(ext => modulePath.endsWith(ext))) {
      const paths = getMarkdownPaths(modulePath);
      const index = (await Promise.all(paths.map(fs.pathExists))).findIndex(
        val => val
      );
      if (index < 0) {
        throw new Error(`no such file or directory ${modulePath}`);
      }
      modulePath = paths[index];
      required = (await fs.readFile(modulePath)).toString();
    } else {
      required = require(modulePath);
    }
  } catch (e) {
    throw new Error(`Unable to import provided path: ${e.message}`);
  }
  if (typeof required === 'string') {
    content = required;
  } else if (typeof required === 'function') {
    if (args) {
      content = required(...args);
    } else {
      content = required();
    }
    if (content instanceof Promise) {
      content = await content;
    }
  } else {
    throw new Error(`Exported value must either be a string or a function`);
  }

  return runEmdaer ? emdaer(path, content, { marked: false }) : content;
}

module.exports = importPlugin;
