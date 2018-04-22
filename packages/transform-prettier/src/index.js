/* @flow */

const prettier = require('prettier');

const PARSER = 'markdown';

/**
 * Transform a string using prettier.
 * @see {@link https://github.com/prettier/prettier#options|Prettier docs}
 * @example
 *  <!--emdaer-t
 *   - '@emdaer/transform-prettier'
 *   - options:
 *       config: ./prettier.config.js
 * -->
 * @param   {string}          content                The content
 * @param   {Object}          options                Transform options
 * @param   {Object}          options.options        Prettier options
 * @param   {string}          options.options.config The path to the Prettier config file. Overrides other Prettier options provided.
 *
 * @returns {Promise<string>} The content formatted by Prettier
 */
async function prettierTransform(
  content: string,
  {
    options,
  }: {
    options: {
      config?: string,
      parser: 'markdown',
    },
  } = { options: { parser: PARSER } }
): Promise<string> {
  let prettierOptions;
  if (options.config) {
    try {
      prettierOptions = await prettier.resolveConfig(options.config);
    } catch (e) {
      throw new Error(`Prettier failed to resolve config: ${e.message}`);
    }
  } else {
    prettierOptions = options;
  }
  const opts = Object.assign(prettierOptions, { parser: 'markdown' });
  return prettier.format(content, opts);
}

module.exports = prettierTransform;
