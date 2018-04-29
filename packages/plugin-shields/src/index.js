/* @flow */

type Shield = {
  alt: string,
  image: string,
  link: string,
  style: 'plastic' | 'flat' | 'flat--squared' | 'social',
};

/**
 * Render metadata badges for open source projects from shields.io.
 *
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-shields'
 *   - shields:
 *       - alt: 'Documented with emdaer'
 *         image: 'badge/📓-documented%20with%20emdaer-F06632.svg'
 *         link: 'https://github.com/emdaer/emdaer'
 *         style: 'flat-square'
 * -->
 * @param options
 * @param {Array<Shield>} [options.shields] The shields.
 * @returns {Promise<string>} Markdown images, one per shield, all on one line.
 */
async function shieldsPlugin({
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
}

module.exports = shieldsPlugin;
