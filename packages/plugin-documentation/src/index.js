/* @flow */

const documentation = require('documentation');

/**
 * Render documentation from specified source code.
 *
 * @see {@link http://documentation.js.org/}
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-documentation'
 *   - sources:
 *     - ./src/index.js
 * -->
 * @param                     options
 * @param   {array}          [options.sources] Globs that specify the paths to the documentation sources.
 * @returns {Promise<string>}                   The rendered documentation
 */
async function documentationPlugin({
  sources,
}: {
  sources: Array<string>,
}): Promise<string> {
  // @TODO make it work with TypeScript
  return documentation.formats.md(await documentation.build(sources, {}), {});
}

module.exports = documentationPlugin;
