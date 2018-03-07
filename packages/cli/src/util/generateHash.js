/* @flow */
const crypto = require('crypto');

module.exports = function generateHash(content: string): string {
  return crypto
    .createHash('md5')
    .update(content)
    .digest('hex');
};
