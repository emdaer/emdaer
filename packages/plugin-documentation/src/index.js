/* @flow */

const documentation = require('documentation');

/**
 * A plugin to generate documentation
 *
 * @param                     options
 * @param   {string}          [options.sources] The sources of the documentation
 * @returns {Promise<string>}                   The documentation
 */
async function documentationPlugin({
  sources,
}: {
  sources: Array<string>,
}): Promise<string> {
  return documentation.formats.md(await documentation.build(sources, {}), {});
}

module.exports = documentationPlugin;
