/* @flow */

const toc = require('markdown-toc');

/**
 * Generate a table of contents from markdown
 *
 * @param   {string}          content The content
 * @returns {Promise<string>}         The content with the table of contents inserted
 */
async function tableOfContentsTransform(content: string): Promise<string> {
  if (!content.includes('<!-- toc -->')) {
    throw new Error(
      'Content does not contain "<!-- toc -->" and therefore cannot insert a table of contents.'
    );
  }
  return toc.insert(content);
}

module.exports = tableOfContentsTransform;
