/* @flow */

const { emojify } = require('node-emoji');

/**
 * Applies gh-emoji
 *
 * @param   {string}          content The content
 * @returns {Promise<string>}         The content with emojis in place of emoji codes
 */
async function githubEmojiTransform(content: string): Promise<string> {
  return emojify(content);
}

module.exports = githubEmojiTransform;
