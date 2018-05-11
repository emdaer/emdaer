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
  const hashIndex = file.indexOf(HASH_DELIMITER);
  if (hashIndex === -1) {
    return emptyTuple;
  }
  const hashStartIndex = hashIndex + HASH_DELIMITER.length;
  const existingHash = file.slice(
    hashStartIndex,
    hashStartIndex + EMDAER_HASH_COMMENT_LENGTH
  );
  const existingContents = file.slice(
    hashStartIndex + EMDAER_HASH_COMMENT_LENGTH + 6,
    file.length
  );
  return [existingHash, generateHash(existingContents)];
};
