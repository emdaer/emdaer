/* @flow */

const execa = require('execa');

/**
 *  Checks if given destination has changes.
 * @param {string} destination
 *  The destination file name to check
 * @returns {Promise<boolean>} dirty
 *  Whether or not the file has changes
 */
module.exports = async function checkDirtyDestination(
  destination: string
): Promise<boolean> {
  let isGit;
  try {
    isGit = await execa('git', ['rev-parse', '--is-inside-work-tree']);
  } catch (e) {
    isGit = { stdout: '' };
  }
  if (isGit && isGit.stdout === 'true') {
    const changes = await execa('git', ['status', '--short', destination]);
    if (changes && changes.stdout.split(destination).length > 1) {
      return true;
    }
  }
  return false;
};
