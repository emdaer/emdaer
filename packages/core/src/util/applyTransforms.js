/* @flow */

const { safeLoad } = require('js-yaml');

const EmdaerError = require('./EmdaerError');
const { NO_TRANSFORM } = require('../_errors');
const applyTransform = require('./applyTransform');

/**
 * Applies transforms to generated content
 */
module.exports = async function applyTransforms(
  content: string,
  transforms: Array<string>
): Promise<string> {
  const replacementContent = content;

  return transforms.reduce((acc, match): Promise<string> => {
    const [, , body] = /(<!--emdaer-t)([\s\S]*?)(-->)/g.exec(match);
    if (!body.trim()) {
      throw new EmdaerError(NO_TRANSFORM, 'Invalid emdaer comment');
    }
    return (async () => {
      const accContent = await acc;
      return applyTransform(accContent.replace(match, ''), safeLoad(body));
    })();
  }, Promise.resolve(replacementContent));
};
