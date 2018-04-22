/* @flow */

const { readJson } = require('fs-extra');
// 💩
const { promisify } = require('util');
const glob = promisify(require('glob'));

/**
 * Render a markdown list of the names and optional descriptions of lerna packages.
 *
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-list-lerna-packages'
 *   - pattern: packages/transform-*
 *     links: false
 * -->
 * @param options
 * @param {string} [options.pattern] Relative glob path to lerna packages.
 * @param {boolean} [options.links] Whether to link to each package.
 * @param {boolean} [options.descriptions] Whether to include each package description.
 * @returns {Promise<string>} The markdown list.
 */
async function listLernaPackagesPlugin(options: {
  pattern?: string,
  links?: boolean,
  descriptions?: boolean,
}): Promise<?string> {
  const { pattern, links, descriptions } = Object.assign(
    { pattern: './packages/*', links: true, descriptions: true },
    options
  );
  return (await Promise.all(
    (await glob(pattern)).map(async path => {
      const { name, description } = await readJson(`${path}/package.json`);
      const preparedName = [links && '[', name, links && `](${path})`]
        .filter(exists => exists)
        .join('');
      return `- **${preparedName}**${descriptions ? ` ${description}` : ''}`;
    })
  )).join('\n');
}

module.exports = listLernaPackagesPlugin;
