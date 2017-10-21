/* @flow */

/**
 * A plugin to generate lists
 *
 * @param                     options
 * @param   {'ol' | 'ul'}     [options.type]  The type of list
 * @param   {Array<string>}   [options.items] The items to list
 * @returns {Promise<string>}                 The list element
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
