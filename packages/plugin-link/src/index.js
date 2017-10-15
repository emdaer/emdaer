/* @flow */

const isUrl = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
const isRepoFilePath = /^..\/blob/;
const isHashAnchor = /^#{1}/;

/**
 * A plugin to generate links
 *
 * @param                     options
 * @param   {string}          [options.content]           The content of the link
 * @param   {string}          [options.link]              The link
 * @param   {string}          [options.title]             The link title
 * @param   {string}          [options.id]                The id
 * @returns {Promise<string>}                             The link element in markdown
 */
module.exports = async function linkPlugin({
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
};
