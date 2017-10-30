/* @flow */

/**
 * Render HTML list elements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li}
 *
 * @param options
 * @param {'ol' | 'ul'} [options.type] The type of list; ol (ordered) and ul (unordered).
 * @param {Array<string>} [options.items] The list items; each will be rendered as an li element.
 * @returns {Promise<string>} The list HTML element.
 */
async function listPlugin({
  type,
  items,
}: {
  type: 'ol' | 'ul',
  items: Array<string>,
}): Promise<string> {
  return [
    `<${type}>`,
    ...(await Promise.all(
      items.map(
        async item =>
          `<li>${typeof item === 'string'
            ? item
            : await listPlugin(item.options)}</li>`
      )
    )),
    `</${type}>`,
  ].join('\n');
}

module.exports = listPlugin;
