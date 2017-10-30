/* @flow */

const documentation = require('documentation');

/**
 * Render documentation from specified source code.
 *
 * @see {@link http://documentation.js.org/}
 *
 * @param                     options
 * @param   {array}          [options.sources] Globs that specify the paths to the documentation sources.
 * @returns {Promise<string>}                   The rendered documentation
 */
async function documentationPlugin({
  sources,
}: {
  sources: Array<string>,
}): Promise<string> {
  return documentation.formats.md(await documentation.build(sources, {}), {});
}

module.exports = documentationPlugin;
