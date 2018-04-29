/* @flow */

const toc = require('markdown-toc');

/**
 * Generate a table of contents from markdown
 *
 * @example
 * <!--emdaer-t
 *   - '@emdaer/transform-table-of-contents'
 * -->
 * @param   {string}          content The content
 * @returns {Promise<string>}         The content with the table of contents inserted
 */
async function tableOfContentsTransform(
  content: string,
  options: *,
  comment: string
): Promise<string> {
  return toc.insert(content.replace(comment, '<!-- toc -->'));
}

module.exports = tableOfContentsTransform;
