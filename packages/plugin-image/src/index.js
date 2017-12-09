/* @flow */

/**
 * Renders HTML img elements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}
 *
 * @param options
 * @param {string} options.src The image URL.
 * @param {string} [options.alt] The alternative text describing the image.
 * @param {'left'|'center'|'right'} [options.align] The alignment of the image with respect to its surrounding context.
 * @param {string} [options.width] The intrinsic width of the image in pixels.
 * @param {string} [options.height] The intrinsic height of the image in pixels.
 * @returns {Promise<string>} The image element
 */
async function imagePlugin({
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
  return `<p${align ? ` align="${align}"` : ''}><img src="${src}"${alt
    ? ` alt="${alt}"`
    : ''}${width ? ` width="${width}"` : ''}${height
    ? ` height="${height}"`
    : ''} /></p>`;
}

module.exports = imagePlugin;
