/* @flow */

const { readFile } = require('fs-extra');

const generateHash = require('./generateHash');

const HASH_DELIMITER = 'emdaerHash:';
const EMDAER_HASH_COMMENT_LENGTH = 32;

/**
 *  Gets existing hash and content hash of destination file
 * @param {string} destination
 *  The destination file path
 * @returns {Promise<[string, string]>} contents tuple
 *  The existing hash and the existin file content,
 *  sans emdaer meta data, respectively
 */
module.exports = async function getHashDiff(
  destination: string
): Promise<[string, string]> {
  const emptyTuple = ['', ''];
  let file;
  try {
    file = (await readFile(destination)).toString();
  } catch (e) {
    return emptyTuple;
  }
  const hashStartIndex = file.indexOf(HASH_DELIMITER) + HASH_DELIMITER.length;
  if (hashStartIndex === -1) {
    return emptyTuple;
  }
  const existingHash = file.slice(
    hashStartIndex,
    hashStartIndex + EMDAER_HASH_COMMENT_LENGTH
  );
  const existingContents = file.slice(hashStartIndex + 38, file.length);
  return [existingHash, generateHash(existingContents)];
};
