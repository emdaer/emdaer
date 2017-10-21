/* @flow */

const { readJson } = require('fs-extra');
// 💩
const { promisify } = require('util');
const glob = promisify(require('glob'));

/**
 * A plugin to generate a list of lerna packages
 *
 * @param                     options
 * @param   {string}          [options.links]        Whether to link to the packages
 * @param   {string}          [options.descriptions] Whether to include the packages' description
 * @returns {Promise<string>}                        The list in markdown
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
