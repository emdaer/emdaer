/* @flow */

/**
 * A plugin to generate images
 *
 * @param                                 options
 * @param   {string}                      options.src      The src url for the image
 * @param   {string}                      [options.alt]    The alt text for the image
 * @param   {'left' | 'center' | 'right'} [options.align]  The align of the image
 * @param   {string}                      [options.width]  The width of the image
 * @param   {string}                      [options.height] The height of the image
 * @returns {Promise<string>}                              The image element
 */
async function linkPlugin({
  src,
  alt,
  align,
  width,
  height,
}: {
  src: string,
  alt?: string,
  align?: 'left' | 'center' | 'right',
  width?: number,
  height?: number,
}): Promise<?string> {
  return `<img src="${src}"${alt ? ` alt="${alt}"` : ''}${align
    ? ` align="${align}"`
    : ''}${width ? ` width="${width}"` : ''}${height
    ? ` height="${height}"`
    : ''} />`;
}

module.exports = linkPlugin;
