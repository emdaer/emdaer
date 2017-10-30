/* @flow */

const isUrl = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
const isRepoFilePath = /^..\/blob/;
const isHashAnchor = /^#{1}/;

/**
 * Render HTML anchor elements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
 *
 * @param                     options
 * @param   {string}          [options.content] The content of the link
 * @param   {string}          [options.link] Contains a URL or a URL fragment that the hyperlink points to.
 * @param   {string}          [options.title] Specifies a title to associate with the element.
 * @param   {string}          [options.id] Document wide identifier.
 * @returns {Promise<string>} The link as an anchor HTML element.
 */
async function linkPlugin({
  content,
  link,
  title,
  id,
}: {
  content: string,
  link?: string,
  title?: string,
  id?: string,
}): Promise<?string> {
  let href = '';
  if (link) {
    if (
      isUrl.test(link) ||
      isRepoFilePath.test(link) ||
      isHashAnchor.test(link)
    ) {
      href = link;
    } else {
      return null;
    }
  }
  return `<a${href ? ` href="${href}"` : ''}${id ? ` id="${id}"` : ''}${title
    ? ` title="${title}"`
    : ''}>${content}</a>`;
}

module.exports = linkPlugin;
