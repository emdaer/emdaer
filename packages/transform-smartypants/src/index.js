/* @flow */

const { smartypants } = require('smartypants');

function makeDumb(
  content: string,
  quotePattern: RegExp,
  replacement: string
): string {
  return content.replace(
    /(`{1,3})([\s\S]*?)(`{1,3})/gm,
    (_, p1, p2, p3) => `${p1}${p2.replace(quotePattern, replacement)}${p3}`
  );
}

function fixDouble(content: string): string {
  return makeDumb(content, /&#8220;|&#8221;/g, '"');
}

function fixSingle(content: string): string {
  return makeDumb(content, /&#8216;|&#8217;/g, "'");
}

function revertQuotesInCode(content: string): string {
  return fixSingle(fixDouble(content));
}

/**
 * Translate plain ASCII punctuation characters into "smart" typographic punctuation HTML entities.
 *
 * @see {@link https://www.npmjs.com/package/smartypants}
 *
 * @param {string} content Raw content.
 * @returns {Promise<string>} The content with "smart" typographic punctuation.
 */
async function smartypantsTransform(
  content: string,
  { options }: { options: string }
): Promise<string> {
  return revertQuotesInCode(smartypants(content, options));
}

module.exports = smartypantsTransform;
