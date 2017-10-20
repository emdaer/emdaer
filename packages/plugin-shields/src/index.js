/* @flow */

type Shield = {
  alt: string,
  image: string,
  link: string,
  style: 'plastic' | 'flat' | 'flat--squared' | 'social',
};

/**
 * A plugin to generate shields from shields.io
 *
 * @param                     options
 * @param   {Array<Shield>}   [options.shields] The shields
 * @returns {Promise<string>}                   The table element
 */
module.exports = async function shieldsPlugin({
  shields,
}: {
  shields: Array<Shield>,
}): Promise<?string> {
  return `${shields
    .map(
      ({ alt = '', image = '', link = '', style = 'plastic' }) =>
        `[![${alt}](https://img.shields.io/${image}${`?style=${style}`})](${link})`
    )
    .join(' ')}`;
};
