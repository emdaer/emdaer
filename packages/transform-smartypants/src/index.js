/* @flow */

const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  smartypants: true,
});

/**
 * Translate plain ASCII punctuation characters into "smart" typographic punctuation HTML entities.
 *
 * @param {string} content Raw content.
 * @returns {Promise<string>} The content with "smart" typographic punctuation.
 */
async function smartypantsTransform(content: string): Promise<string> {
  return marked(content);
}

module.exports = smartypantsTransform;
