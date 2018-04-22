/* @flow */

const { emojify } = require('node-emoji');

/**
 * Transform a string using node-emoji.
 * @example
 * <!--emdaer-t
 *   - '@emdaer/transform-github-emoji'
 * -->
 * @param   {string}          content The content
 * @returns {Promise<string>}         The content with emojis in place of emoji codes
 */
async function githubEmojiTransform(content: string): Promise<string> {
  return emojify(content);
}

module.exports = githubEmojiTransform;
